import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MerchantOutlet } from 'db/entities/merchantOutlet'
import { FindCondition, Repository } from 'typeorm'
import { FindMerchantOutletsRequest } from 'types/interfaces'

@Injectable()
export class MerchantOutletsService {
  constructor(
    @InjectRepository(MerchantOutlet)
    private merchantOutletRepository: Repository<MerchantOutlet>
  ) {}

  findMerchantOutlets(
    query: FindMerchantOutletsRequest
  ): Promise<MerchantOutlet[]> {
    const where: FindCondition<MerchantOutlet> = {}
    if (query.merchantName) {
      where.merchant = { name: query.merchantName }
    }

    return this.merchantOutletRepository.find({
      where,
      skip: query.skip ?? 0,
      take: query.take ?? 100,
      relations: ['merchant'],
    })
  }

  findOne(id: string): Promise<MerchantOutlet | undefined> {
    return this.merchantOutletRepository.findOne(id)
  }
}
