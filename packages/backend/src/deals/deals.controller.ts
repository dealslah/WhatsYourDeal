import { Controller, Get, Param } from '@nestjs/common'
import { Deal } from 'types/models';
import { DealsService } from './deals.service'

@Controller('deals')
export class DealsController {
  constructor(private dealsService: DealsService) {}

  @Get()
  async findAll(): Promise<Deal[]> {
    return this.dealsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Deal {
    console.log(id);
    return this.dealsService.findOne(id);
  }
}