import { Deal } from 'db/entities/deal'
import {
  AbstractRepository,
  EntityRepository,
  FindManyOptions,
  FindOneOptions,
  FindOptionsUtils,
  getConnection,
  SaveOptions,
} from 'typeorm'
import { Point } from 'wkx'

type AdditionalOpts = {
  closestTo?: Point
  withinRangeInMeters?: number
  orderByDistance?: 'ASC' | 'DESC'
}

@EntityRepository(Deal)
export class DealRepository extends AbstractRepository<Deal> {
  findOne(id: number, options?: FindOneOptions<Deal> & AdditionalOpts) {
    let query = this.getBaseFindQuery(options)
    query = query.andWhereInIds([id])
    return query.getOne()
  }

  find(options?: FindManyOptions<Deal> & AdditionalOpts): Promise<Deal[]> {
    const query = this.getBaseFindQuery(options)
    return query.getMany()
  }

  private getBaseFindQuery(
    options?: (FindManyOptions<Deal> | FindOneOptions<Deal>) & AdditionalOpts
  ) {
    const metadata = getConnection().getMetadata(Deal)

    let query = this.manager.createQueryBuilder(Deal, metadata.name)
    FindOptionsUtils.applyFindManyOptionsOrConditionsToQueryBuilder(
      query,
      options
    )
    if (
      !FindOptionsUtils.isFindManyOptions(options) ||
      options.loadEagerRelations !== false
    ) {
      FindOptionsUtils.joinEagerRelations(query, query.alias, metadata)
    }

    if (options?.closestTo) {
      query = query.addSelect(
        `ST_Distance_Sphere(geoLocation, ST_GeomFromText('${options.closestTo.toWkt()}', 4326))`,
        'distance'
      )

      query = query.orderBy('distance', options.orderByDistance ?? 'ASC')
    }

    if (options?.withinRangeInMeters) {
      query = query.having(`distance < ${options.withinRangeInMeters}`)
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
