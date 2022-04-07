import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Deal } from 'db/entities/deal'
import { MerchantOutlet } from 'db/entities/merchantOutlet'
import { DealRepository } from 'db/repositories/deal'
import { FindCondition, In, Repository } from 'typeorm'
import { CreateDealRequest, FindDealsRequest } from 'types/interfaces'
import { Point } from 'wkx'

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(DealRepository)
    private dealsRepository: DealRepository,
    @InjectRepository(MerchantOutlet)
    private merchantOutletRepository: Repository<MerchantOutlet>
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
      take: query.take ?? 50,
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

  async createDeal(request: CreateDealRequest) {
    const merchantOutlet = await this.merchantOutletRepository.findOne(
      request.merchantOutletId,
      { relations: ['merchant'] }
    )
    const deals = await this.dealsRepository.save([
      new Deal({
        merchantOutlet,
        description: request.dealDescription,
        dealStartDate: new Date(request.promotionStartDate),
        dealEndDate: new Date(request.promotionEndDate),
        originalPrice: request.originalPrice,
        discountPrice: request.currentPrice,
      }),
    ])

    return deals[0]
  }
}
