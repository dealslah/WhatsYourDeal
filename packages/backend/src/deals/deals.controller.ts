import { Controller, Get, Param, Req } from '@nestjs/common'
import { Deal } from 'db/entities/deal'
import { Request } from 'express'
import { DealsService } from './deals.service'
@Controller('deals')
export class DealsController {
  constructor(private dealsService: DealsService) {}

  @Get('merchantoutlet')
  async findByMerchantOutlet(
    @Req() request: Request
  ): Promise<Deal[] | undefined> {
    let merchantOutletId = -1
    if (
      request.query.merchantOutletId &&
      typeof request.query.merchantOutletId === 'string'
    ) {
      merchantOutletId = parseInt(request.query.merchantOutletId)
    }
    return this.dealsService.findByMerchantOutletId(merchantOutletId)
  }

  @Get()
  async findAll(@Req() request: Request): Promise<Deal[]> {
    let skip = 0
    let take = 100
    if (request.query.skip && typeof request.query.skip === 'string') {
      skip = parseInt(request.query.skip)
    }
    if (request.query.take && typeof request.query.take === 'string') {
      take = parseInt(request.query.take)
    }
    return this.dealsService.findAll(skip, take)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Deal | undefined> {
    return this.dealsService.findOne(id)
  }

}
