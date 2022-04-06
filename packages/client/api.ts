import axios, { AxiosInstance } from 'axios'
import {
  FindDealByIdResponse,
  FindDealsRequest,
  FindDealsResponse,
} from '@whatsyourdeal/backend/types/interfaces'

class Api {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 1000,
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

  private async get<T, U>(path: string, params?: T): Promise<U> {
    const response = await this.client.get(path, params)
    return response.data
  }
}

export default new Api()
