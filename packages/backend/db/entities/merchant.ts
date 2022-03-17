import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export enum MerchantCategory {
  RESTAURANTS = 'Restaurants',
  ENTERTAINMENT = 'Entertainment',
  HOTEL = 'Hotel',
}

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'enum', enum: MerchantCategory })
  category: MerchantCategory

  @Column()
  description: string
}
