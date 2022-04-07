import axios, { AxiosInstance } from 'axios'

interface SendMessageRequest {
  merchant: string
  originalPrice: string
  discountPrice: string
  location: string
  promotionStartDate: string
  promotionEndDate: string
  description: string
}

class TelegramBot {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL:
        'https://y7tpsy3io9.execute-api.us-east-1.amazonaws.com/default/telegram-bot',
      timeout: 10000,
    })
  }

  sendMessage(request: SendMessageRequest) {
    console.log('Sending message: ', request)
    return this.client.get('', { params: request })
  }
}

export default new TelegramBot()
