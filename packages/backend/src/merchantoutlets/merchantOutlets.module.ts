import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MerchantOutlet } from 'db/entities/merchantOutlet'
import { MerchantOutletsController } from './merchantOutlets.controller'
import { MerchantOutletsService } from './merchantOutlets.service'

@Module({
  imports: [TypeOrmModule.forFeature([MerchantOutlet])],
  controllers: [MerchantOutletsController],
  providers: [MerchantOutletsService],
})
export class MerchantOutletsModule {}
