import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Deal } from 'db/entities/deal'
import { DealRepository } from 'db/repositories/deal'
import { FindCondition, In } from 'typeorm'
import { FindDealsRequest } from 'types/interfaces'
import { Point } from 'wkx'

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(DealRepository)
    private dealsRepository: DealRepository
  ) {}

  findDeals(query: FindDealsRequest): Promise<Deal[]> {
    const where: FindCondition<Deal> = {}

    if (query.merchantCategory) {
      if (typeof query.merchantCategory === 'object') {
        where.merchantOutlet = {
          merchant: { category: In(query.merchantCategory) },
        }
      } else {
        where.merchantOutlet = {
          merchant: { category: query.merchantCategory },
        }
      }
    }

    let closestTo: Point | undefined
    let withinRangeInMeters: number | undefined
    let orderByDistance: 'ASC' | 'DESC' | undefined
    if (query.latitude && query.longitude) {
      closestTo = new Point(query.latitude, query.longitude)
      withinRangeInMeters = query.withinRangeInMeters ?? 100
      orderByDistance = query.orderByDistance ?? 'ASC'
    }

    return this.dealsRepository.find({
      where,
      skip: query.skip ?? 0,
      take: query.take ?? 100,
      closestTo,
      withinRangeInMeters,
      orderByDistance,
      relations: ['merchantOutlet', 'merchantOutlet.merchant'],
    })
  }

  findOne(id: number): Promise<Deal | undefined> {
    return this.dealsRepository.findOne(id, {
      relations: ['merchantOutlet', 'merchantOutlet.merchant'],
    })
  }
}
