import { Merchant } from 'db/entities/merchant'
import { Merchant as ApiMerchant } from '../../types/models'

export function mapMerchantToApiType(merchant: Merchant): ApiMerchant {
  return {
    name: merchant.name,
    category: merchant.category,
  }
}
