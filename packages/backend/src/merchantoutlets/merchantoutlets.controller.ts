import { Controller, Get, Param, Req } from '@nestjs/common'
import { MerchantOutlet } from 'db/entities/merchantOutlet'
import { Request } from 'express'
import { MerchantOutletsService } from './merchantoutlets.service'

@Controller('merchantoutlets')
export class MerchantOutletsController {
  constructor(private merchantOutletService: MerchantOutletsService) {}

  @Get('merchant')
  async findByMerchant(
    @Req() request: Request
  ): Promise<MerchantOutlet[] | undefined> {
    let merchantName = ''
    if (
      request.query.merchantName &&
      typeof request.query.merchantName === 'string'
    ) {
      merchantName = request.query.merchantName
    }
    return this.merchantOutletService.findByMerchantName(merchantName)
  }

  @Get()
  async findAll(@Req() request: Request): Promise<MerchantOutlet[]> {
    let skip = 0
    let take = 100
    if (request.query.skip && typeof request.query.skip === 'string') {
      skip = parseInt(request.query.skip)
    }
    if (request.query.take && typeof request.query.take === 'string') {
      take = parseInt(request.query.take)
    }
    return this.merchantOutletService.findAll(skip, take)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MerchantOutlet | undefined> {
    return this.merchantOutletService.findOne(id)
  }
}
