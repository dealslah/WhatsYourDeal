import { Controller, Get, Param, Query } from '@nestjs/common'
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
    return {
      deals: await this.dealsService.findDeals(query),
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FindDealByIdResponse> {
    return {
      deal: (await this.dealsService.findOne(id)) ?? null,
    }
  }
}
