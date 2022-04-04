import { Controller, Get, Query } from '@nestjs/common'
import { mapMerchantToApiType } from 'db/mappers/merchant'
import { FindMerchantsRequest, FindMerchantsResponse } from 'types/interfaces'
import { MerchantsService } from './merchants.service'

@Controller('merchants')
export class MerchantsController {
  constructor(private merchantsService: MerchantsService) {}

  @Get()
  async findAll(
    @Query() query: FindMerchantsRequest
  ): Promise<FindMerchantsResponse> {
    const merchants = await this.merchantsService.findMerchants(query)
    return {
      merchants: merchants.map(mapMerchantToApiType),
    }
  }
}
