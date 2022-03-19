import { Deal } from 'db/entities/deal'
import {
  AbstractRepository,
  EntityRepository,
  FindManyOptions,
  FindOneOptions,
  SaveOptions,
} from 'typeorm'
import { Point } from 'wkx'

type AdditionalOpts = {
  closestTo?: Point
  withinRange?: number
}

@EntityRepository(Deal)
export class DealRepository extends AbstractRepository<Deal> {
  findOne(id: number, options?: FindOneOptions<Deal>) {
    let query = this.getBaseFindQuery(options)
    query = query.andWhereInIds([id])
    return query.getOne()
  }

  find(options?: FindManyOptions<Deal> & AdditionalOpts): Promise<Deal[]> {
    let query = this.getBaseFindQuery(options)

    if (options?.take) {
      query = query.take(options.take)
    }

    if (options?.skip) {
      query = query.skip(options.skip)
    }
    return query.getMany()
  }

  private getBaseFindQuery(
    options?: (FindManyOptions<Deal> | FindOneOptions<Deal>) & AdditionalOpts
  ) {
    let query = this.createQueryBuilder('deal')

    if (options?.closestTo) {
      query = query.addSelect(
        `ST_Distance_Sphere(location, ST_GeomFromText('${options.closestTo.toWkt()}', 4326))`,
        'distance'
      )
    }

    if (options?.withinRange) {
      query = query.having(`distance < ${options.withinRange}`)
    }

    if (options?.where) {
      query = query.where(options.where)
    }

    if (options?.relations) {
      for (const relation of options.relations) {
        query = query.leftJoinAndSelect(relation, '')
      }
    }

    return query
  }

  save(entities: Deal[], options?: SaveOptions) {
    // App level check constraints as TypeORM does not
    // support constraints for MySQL 8 yet.

    if (entities.some((e) => e.dealStartDate >= e.dealEndDate)) {
      throw new Error('dealStartDate must be before dealEndDate')
    }

    if (entities.some((e) => e.originalPrice < 0)) {
      throw new Error('originalPrice must be at least 0')
    }

    if (entities.some((e) => e.discountPrice < 0)) {
      throw new Error('discountPrice must be at least 0')
    }

    if (entities.some((e) => e.originalPrice < e.discountPrice)) {
      throw new Error('originalPrice must be higher than discountPrice')
    }

    return this.repository.save(entities, options)
  }
}
