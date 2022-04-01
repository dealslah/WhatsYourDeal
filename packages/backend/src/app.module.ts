import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Deal } from 'db/entities/deal'
import { Merchant } from 'db/entities/merchant'
import { MerchantOutlet } from 'db/entities/merchantOutlet'
import { DealsModule } from './deals/deals.module'
import { MerchantOutletsModule } from './merchantOutlets/merchantOutlets.module'
import { MerchantsModule } from './merchants/merchants.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'wydu',
      password: 'wydpassword',
      database: 'wyd',
      entities: [Deal, Merchant, MerchantOutlet],
      keepConnectionAlive: true,
      legacySpatialSupport: false,
    }),
    DealsModule,
    MerchantOutletsModule,
    MerchantsModule,
  ],
})
export class AppModule {}
