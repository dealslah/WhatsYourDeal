import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import ormconfig from 'ormconfig'
import { AppController } from './app.controller'
import { DealsModule } from './deals/deals.module'
import { MerchantOutletsModule } from './merchantOutlets/merchantOutlets.module'
import { MerchantsModule } from './merchants/merchants.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    DealsModule,
    MerchantOutletsModule,
    MerchantsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
