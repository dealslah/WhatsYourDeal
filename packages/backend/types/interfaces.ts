import { Deal } from 'db/entities/deal'
import { Merchant, MerchantCategory } from 'db/entities/merchant'
import { MerchantOutlet } from 'db/entities/merchantOutlet'

export interface FindMerchantsRequest {
  name?: string | string[]
  category?: MerchantCategory | MerchantCategory[]
  skip?: number
  take?: number
}

export interface FindMerchantsResponse {
  merchants: Merchant[]
}

export interface FindMerchantOutletsRequest {
  merchantName?: string
  skip?: number
  take?: number
}

export interface FindMerchantOutletsResponse {
  outlets: MerchantOutlet[]
}

export interface FindDealsRequest {
  merchantCategory?: MerchantCategory | MerchantCategory[]
  latitude?: number
  longitude?: number
  withinRangeInMeters?: number
  orderByDistance?: 'ASC' | 'DESC'
  skip?: number
  take?: number
}

export interface FindDealsResponse {
  deals: Deal[]
}

export interface FindDealByIdResponse {
  deal: Deal | null
}
