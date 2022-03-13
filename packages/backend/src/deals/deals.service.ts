import { Injectable, Param } from '@nestjs/common'
import { Deal } from 'types/models';
import { fakeDataDeals } from './fakeData';

@Injectable()
export class DealsService {
  private readonly deals: Deal[] = fakeDataDeals;

  findAll(): Deal[] {
    return this.deals;
  }

  findOne(idx: string): Deal {
      return this.deals[parseInt(idx)]
  }
}