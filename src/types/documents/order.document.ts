import { Document } from 'mongoose'

export interface IOrder extends Document {
  customer: string
  waiter: string
  table: string
  status: string
  items: Array<string>
  totalBill: number
  createdAt?: string
  updatedAt?: string
}
