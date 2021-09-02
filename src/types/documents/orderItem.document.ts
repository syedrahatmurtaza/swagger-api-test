import { Document, Schema } from 'mongoose'

export interface IOrderItem extends Document {
  menuItem: string
  quantity: number
  totalPrice: number
  createdAt?: string
  updatedAt?: string
}
