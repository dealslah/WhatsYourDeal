import { MerchantOutlet } from 'db/entities/merchantOutlet'
import { MerchantOutlet as ApiMerchantOutlet } from '../../types/models'
import { mapMerchantToApiType } from './merchant'

export function mapMerchantOutletToApiType(
  merchantOutlet: MerchantOutlet
): ApiMerchantOutlet {
  return {
    id: merchantOutlet.id,
    merchant: mapMerchantToApiType(merchantOutlet.merchant),
    address: merchantOutlet.address,
    imageUrl: merchantOutlet.imageUrl,
    location: {
      latitude: merchantOutlet.geoLocation.x,
      longitude: merchantOutlet.geoLocation.y,
    },
  }
}
