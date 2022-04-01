import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Deal } from 'db/entities/deal'
import { first } from 'lodash'
import { Between, Repository } from 'typeorm'

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private dealsRepository: Repository<Deal>
  ) {}

  findAll(skip: number, take: number): Promise<Deal[]> {
    return this.dealsRepository.find({ skip, take })
  }

  findOne(id: string): Promise<Deal | undefined> {
    return this.dealsRepository.findOne(id)
  }

  findByMerchantOutletId(
    merchantOutletId: number
  ): Promise<Deal[] | undefined> {
    const values = this.dealsRepository
      .createQueryBuilder('deal')
      .where('deal.merchantOutlet = :merchantOutletId', {
        merchantOutletId: merchantOutletId,
      })
      .getMany()
    console.log(merchantOutletId)
    return values
  }

  async remove(id: string): Promise<void> {
    await this.dealsRepository.delete(id)
  }
}
