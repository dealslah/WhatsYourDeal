import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Deal } from 'db/entities/deal'
import { Merchant } from 'db/entities/merchant'
import { MerchantsController } from './merchants.controller'
import { MerchantsService } from './merchants.service'

@Module({
  imports: [TypeOrmModule.forFeature([Merchant])],
  controllers: [MerchantsController],
  providers: [MerchantsService],
})
export class MerchantsModule {}
