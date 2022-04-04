import { Controller, Get, Query } from '@nestjs/common'
import { FindMerchantsRequest, FindMerchantsResponse } from 'types/interfaces'
import { MerchantsService } from './merchants.service'

@Controller('merchants')
export class MerchantsController {
  constructor(private merchantsService: MerchantsService) {}

  @Get()
  async findAll(
    @Query() query: FindMerchantsRequest
  ): Promise<FindMerchantsResponse> {
    return {
      merchants: await this.merchantsService.findMerchants(query),
    }
  }
}
