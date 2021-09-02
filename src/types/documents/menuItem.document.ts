import { Document } from 'mongoose'

export interface IMenuItem extends Document {
  _id: string
  name: string
  size: string
  price: number
  createdAt?: string
  updatedAt?: string
}
