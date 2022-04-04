import { Controller, Get, Query } from '@nestjs/common'
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
    return {
      outlets: await this.merchantOutletService.findMerchantOutlets(query),
    }
  }
}
