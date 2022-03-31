import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Point } from 'wkx'
import { Merchant } from './merchant'

@Entity()
export class MerchantOutlet {
  constructor(args?: Partial<MerchantOutlet>) {
    Object.assign(this, args)
  }

  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Merchant)
  merchant!: Merchant

  @Column()
  address!: string

  @Column()
  imageUrl!: string

  @Index({ spatial: true })
  @Column({
    type: 'point',
    spatialFeatureType: 'Point',
    srid: 4326,
    transformer: {
      from: (value: string) => Point.parse(value),
      to: (value: Point) => (value instanceof Point ? value.toWkt() : value),
    },
  })
  geoLocation!: Point
}
