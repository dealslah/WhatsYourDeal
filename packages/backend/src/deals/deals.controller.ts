import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { mapDealToApiType } from 'db/mappers/deal'
import telegramBot from 'services/telegramBot'
import {
  CreateDealRequest,
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

  @Post('/create')
  async createDeal(@Body() body: CreateDealRequest) {
    const deal = await this.dealsService.createDeal(body)

    await telegramBot.sendMessage({
      merchant: deal.merchantOutlet.merchant.name,
      location: deal.merchantOutlet.address,
      originalPrice: deal.originalPrice.toString(),
      discountPrice: deal.discountPrice.toString(),
      promotionStartDate: deal.dealStartDate.toDateString(),
      promotionEndDate: deal.dealEndDate.toDateString(),
      description: deal.description,
    })
  }
}
