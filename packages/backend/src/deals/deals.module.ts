import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MerchantOutlet } from 'db/entities/merchantOutlet'
import { DealRepository } from 'db/repositories/deal'
import { DealsController } from './deals.controller'
import { DealsService } from './deals.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([DealRepository]),
    TypeOrmModule.forFeature([MerchantOutlet]),
  ],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
