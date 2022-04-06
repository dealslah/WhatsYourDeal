import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Merchant } from 'db/entities/merchant'
import { FindCondition, In, Repository } from 'typeorm'
import { FindMerchantsRequest } from 'types/interfaces'

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>
  ) {}

  findMerchants(query: FindMerchantsRequest): Promise<Merchant[]> {
    const where: FindCondition<Merchant> = {}

    if (query.name) {
      if (typeof query.name === 'object') {
        where.name = In(query.name)
      } else {
        where.name = query.name
      }
    }

    if (query.category) {
      if (typeof query.category === 'object') {
        where.category = In(query.category)
      } else {
        where.category = query.category
      }
    }

    return this.merchantRepository.find({
      where,
      skip: query.skip ?? 0,
      take: query.take ?? 10,
    })
  }
}
