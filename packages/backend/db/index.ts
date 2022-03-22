import { getCustomRepository } from 'typeorm'
import { Point } from 'wkx'
import { DealRepository } from './repositories/deal'

export function getNumDealsClosestTo(location: Point, numDeals = 50) {
  return getCustomRepository(DealRepository).find({
    closestTo: location,
    take: numDeals,
    relations: ['merchantOutlet', 'merchantOutlet.merchant'],
  })
}

export function getDealById(dealId: number) {
  return getCustomRepository(DealRepository).findOne(dealId, {
    relations: ['merchantOutlet', 'merchantOutlet.merchant'],
  })
}
