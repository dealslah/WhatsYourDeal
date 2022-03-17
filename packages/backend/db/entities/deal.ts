import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Merchant } from './merchant'

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Merchant)
  merchant: Merchant

  @Column({ type: 'float', precision: 2 })
  originalPrice: number

  @Column({ type: 'float', precision: 2 })
  discountPrice: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
