import { Controller, Get, Query } from '@nestjs/common'
import { mapMerchantOutletToApiType } from 'db/mappers/merchantOutlet'
import {
  FindMerchantOutletsRequest,
  FindMerchantOutletsResponse,
} from 'types/interfaces'
import { MerchantOutletsService } from './merchantOutlets.service'

@Controller('merchantoutlets')
export class MerchantOutletsController {
  constructor(private merchantOutletService: MerchantOutletsService) {}

  @Get()
  async findAll(
    @Query() query: FindMerchantOutletsRequest
  ): Promise<FindMerchantOutletsResponse> {
    const outlets = await this.merchantOutletService.findMerchantOutlets(query)
    return {
      outlets: outlets.map(mapMerchantOutletToApiType),
    }
  }
}
