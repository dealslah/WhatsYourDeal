import { Injectable } from '@nestjs/common'
import { Deal } from 'types/models';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Server is running!'
  }
}
