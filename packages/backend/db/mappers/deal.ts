import { Deal } from 'db/entities/deal'
import { Deal as ApiDeal } from '../../types/models'
import { mapMerchantOutletToApiType } from './merchantOutlet'

export function mapDealToApiType(deal: Deal): ApiDeal {
  return {
    id: deal.id,
    merchantOutlet: mapMerchantOutletToApiType(deal.merchantOutlet),
    originalPrice: deal.originalPrice,
    currentPrice: deal.discountPrice,
    dealDescription: deal.description,
    promotionStartDate: deal.dealStartDate,
    promotionEndDate: deal.dealEndDate,
  }
}
