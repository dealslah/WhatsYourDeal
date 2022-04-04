import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { MerchantOutlet } from './merchantOutlet'

@Entity()
export class Deal {
  constructor(args?: Partial<Deal>) {
    Object.assign(this, args)
  }

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => MerchantOutlet)
  merchantOutlet: MerchantOutlet

  @Column({ type: 'float', precision: 2 })
  originalPrice: number

  @Column({ type: 'float', precision: 2 })
  discountPrice: number

  @Column({ type: 'text' })
  description: string

  @Column()
  dealStartDate: Date

  @Column()
  dealEndDate: Date

  // For debug purposes
  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
