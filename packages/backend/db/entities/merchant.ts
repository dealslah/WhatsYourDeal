import { Column, Entity, PrimaryColumn } from 'typeorm'

export enum MerchantCategory {
  RESTAURANTS = 'Restaurants',
  ENTERTAINMENT = 'Entertainment',
  HOTEL = 'Hotel',
}

@Entity()
export class Merchant {
  constructor(args?: Partial<Merchant>) {
    Object.assign(this, args)
  }

  @PrimaryColumn()
  name: string

  @Column({ type: 'enum', enum: MerchantCategory })
  category: MerchantCategory
}
