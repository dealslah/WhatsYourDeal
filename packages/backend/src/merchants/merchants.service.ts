import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Deal } from 'db/entities/deal'
import { Merchant } from 'db/entities/merchant'
import { MerchantOutlet } from 'db/entities/merchantOutlet'
import { first } from 'lodash'
import { Between, Repository } from 'typeorm'

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>
  ) {}

  findAll(skip: number, take: number): Promise<Merchant[]> {
    return this.merchantRepository.find({ skip, take })
  }

  findOne(name: string): Promise<Merchant | undefined> {
    const values = this.merchantRepository
      .createQueryBuilder('merchant')
      .where('merchant.name = :name', {
        name: name,
      })
      .getOne()
    return values
  }

  findByCategory(category: number): Promise<Merchant[] | undefined> {
    const values = this.merchantRepository
      .createQueryBuilder('merchant')
      .where('merchant.category = :category', {
        category: category,
      })
      .getMany()
    return values
  }

  async remove(id: string): Promise<void> {
    await this.merchantRepository.delete(id)
  }
}
