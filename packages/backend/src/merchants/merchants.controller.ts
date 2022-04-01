import { Controller, Get, Param, Req } from '@nestjs/common'
import { Merchant } from 'db/entities/merchant'
import { Request } from 'express'
import { MerchantsService } from './merchants.service'

@Controller('merchants')
export class MerchantsController {
  constructor(private merchantsService: MerchantsService) {}

  @Get('category')
  async findByCategory(
    @Req() request: Request
  ): Promise<Merchant[] | undefined> {
    let category = -1
    if (request.query.category && typeof request.query.category === 'string') {
      category = parseInt(request.query.category)
    }
    return this.merchantsService.findByCategory(category)
  }

  @Get('name')
  async findOne(@Req() request: Request): Promise<Merchant | undefined> {
    let name = ''
    if (request.query.name && typeof request.query.name === 'string') {
      name = request.query.name
    }
    return this.merchantsService.findOne(name)
  }

  @Get()
  async findAll(@Req() request: Request): Promise<Merchant[]> {
    let skip = 0
    let take = 100
    if (request.query.skip && typeof request.query.skip === 'string') {
      skip = parseInt(request.query.skip)
    }
    if (request.query.take && typeof request.query.take === 'string') {
      take = parseInt(request.query.take)
    }
    return this.merchantsService.findAll(skip, take)
  }
}
