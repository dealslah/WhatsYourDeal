import { Merchant } from "./merchant";

export interface MerchantOutlet {
  id: string;

  merchant: Merchant;
  address: string;
  imageUrl: string;

  location: {
    latitude: number;
    longitude: number;
  }
}
