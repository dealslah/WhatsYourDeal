import { Controller, Get, Param, Query } from '@nestjs/common'
import { mapDealToApiType } from 'db/mappers/deal'
import {
  FindDealByIdResponse,
  FindDealsRequest,
  FindDealsResponse,
} from 'types/interfaces'
import { DealsService } from './deals.service'
@Controller('deals')
export class DealsController {
  constructor(private dealsService: DealsService) {}

  @Get()
  async findAll(@Query() query: FindDealsRequest): Promise<FindDealsResponse> {
    const deals = await this.dealsService.findDeals(query)
    return {
      deals: deals.map(mapDealToApiType),
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FindDealByIdResponse> {
    const deal = await this.dealsService.findOne(id)
    return {
      deal: deal ? mapDealToApiType(deal) : null,
    }
  }
}
