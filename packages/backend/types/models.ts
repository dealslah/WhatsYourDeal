export enum MerchantCategory {
  RESTAURANTS = 'Restaurants',
  ENTERTAINMENT = 'Entertainment',
  HOTEL = 'Hotel',
}

export interface Merchant {
  name: string
  category: string
}

export interface MerchantOutlet {
  id: number
  merchant: Merchant
  address: string
  imageUrl: string
  location: {
    latitude: number
    longitude: number
  }
}

export interface Deal {
  id: number
  merchantOutlet: MerchantOutlet
  originalPrice: number
  currentPrice: number
  dealDescription: string
  promotionStartDate?: Date
  promotionEndDate?: Date
}
