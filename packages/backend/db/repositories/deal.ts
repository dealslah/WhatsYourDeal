import { Deal } from 'db/entities/deal'
import { EntityRepository, AbstractRepository, FindManyOptions } from 'typeorm'
import { Point } from 'wkx'

@EntityRepository(Deal)
export class DealRepository extends AbstractRepository<Deal> {
  find(
    options?: FindManyOptions<Deal> & {
      closestTo?: Point
      withinRange?: number
    }
  ): Promise<Deal[]> {
    let query = this.createQueryBuilder('deal')

    if (options?.closestTo && options?.withinRange) {
      query = query
        .addSelect(
          `ST_Distance_Sphere(location, ST_GeomFromText('${options.closestTo.toWkt()}', 4326))`,
          'distance'
        )
        .having(`distance < ${options.withinRange}`)
    }

    if (options?.where) {
      query = query.where(options.where)
    }

    if (options?.take) {
      query = query.take(options.take)
    }

    if (options?.skip) {
      query = query.skip(options.skip)
    }

    if (options?.relations) {
      for (const relation of options.relations) {
        query = query.leftJoinAndSelect(relation, '')
      }
    }

    return query.getMany()
  }
}
