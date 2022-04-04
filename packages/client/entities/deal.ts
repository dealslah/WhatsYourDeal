import { MerchantOutlet } from './merchantOutlet'

export interface Deal {
  id: string

  merchantOutlet: MerchantOutlet

  originalPrice: number
  currentPrice: number

  dealDescription: string

  promotionStartDate?: number
  promotionEndDate?: number

  createdAt: number
  updatedAt: number
}
