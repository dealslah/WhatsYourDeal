import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MerchantOutlet } from 'db/entities/merchantOutlet'
import { MerchantOutletsController } from './merchantoutlets.controller'
import { MerchantOutletsService } from './merchantoutlets.service'

@Module({
  imports: [TypeOrmModule.forFeature([MerchantOutlet])],
  controllers: [MerchantOutletsController],
  providers: [MerchantOutletsService],
})
export class MerchantOutletsModule {}
