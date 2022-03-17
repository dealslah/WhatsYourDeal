import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Point } from 'wkx'
import { Merchant } from './merchant'

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Merchant)
  merchant: Merchant

  @Column()
  imageUrl: string

  @Column({ type: 'float', precision: 2 })
  originalPrice: number

  @Column({ type: 'float', precision: 2 })
  discountPrice: number

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
  location: Point

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
