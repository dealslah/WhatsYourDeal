import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DealRepository } from 'db/repositories/deal'
import { DealsController } from './deals.controller'
import { DealsService } from './deals.service'

@Module({
  imports: [TypeOrmModule.forFeature([DealRepository])],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
