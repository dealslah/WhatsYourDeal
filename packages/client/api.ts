import axios, { AxiosInstance } from 'axios'
import {
  FindMerchantsRequest,
  FindMerchantsResponse,
  FindDealByIdResponse,
  FindDealsRequest,
  FindDealsResponse,
  FindMerchantOutletsRequest,
  FindMerchantOutletsResponse,
  CreateDealRequest,
} from '@whatsyourdeal/backend/types/interfaces'

class Api {
  private client: AxiosInstance

  constructor() {
    let baseURL: string | undefined
    switch (process.env['NODE_ENV']) {
      case 'production':
        baseURL = `http://whatsyourdeal-env.eba-wmkm2ixm.us-west-2.elasticbeanstalk.com/api`
        break
      default:
        baseURL = 'http://localhost:8080/api'
        break
    }

    this.client = axios.create({
      baseURL,
      timeout: 10000,
    })
  }

  async findDeals(latitude: number, longitude: number) {
    return this.get<FindDealsRequest, FindDealsResponse>('deals', {
      latitude,
      longitude,
    })
  }

  async findDealById(id: number) {
    return this.get<unknown, FindDealByIdResponse>(`deals/${id}`)
  }

  async listMerchants() {
    return this.get<FindMerchantsRequest, FindMerchantsResponse>(`merchants`, {
      take: 100,
    })
  }

  async listMerchantOutlets(merchantName: string) {
    return this.get<FindMerchantOutletsRequest, FindMerchantOutletsResponse>(
      `merchantOutlets`,
      { merchantName }
    )
  }

  async createDeal(request: CreateDealRequest) {
    return this.client.post('deals/create', request)
  }

  private async get<T, U>(path: string, params?: T): Promise<U> {
    const response = await this.client.get(path, { params })
    return response.data
  }
}

export default new Api()
