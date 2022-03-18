export interface Deal {
  id: number;
  image?: string;
  storeName: string;
  dealDescription: string;
  originalPrice?: number;
  currentPrice: number;
  promotionStartDate?: number;
  promotionEndDate?: number;
  location?: {
    latitude: number;
    longitude: number;
  }
}
