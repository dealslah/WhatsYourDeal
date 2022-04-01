import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Deal } from 'db/entities/deal'
import { MerchantOutlet } from 'db/entities/merchantOutlet'
import { first } from 'lodash'
import { Between, Repository } from 'typeorm'

@Injectable()
export class MerchantOutletsService {
  constructor(
    @InjectRepository(MerchantOutlet)
    private merchantOutletRepository: Repository<MerchantOutlet>
  ) {}

  findAll(skip: number, take: number): Promise<MerchantOutlet[]> {
    return this.merchantOutletRepository.find({ skip, take })
  }

  findOne(id: string): Promise<MerchantOutlet | undefined> {
    return this.merchantOutletRepository.findOne(id)
  }

  findByMerchantName(
    merchantName: string
  ): Promise<MerchantOutlet[] | undefined> {
    const values = this.merchantOutletRepository
      .createQueryBuilder('merchant_outlet')
      .where('merchant_outlet.merchantName = :merchantName', {
        merchantName: merchantName,
      })
      .getMany()
    return values
  }

  async remove(id: string): Promise<void> {
    await this.merchantOutletRepository.delete(id)
  }
}
