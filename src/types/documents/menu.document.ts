import { Document } from 'mongoose'

export interface IMenu extends Document {
  _id: string
  name: string
  items: Array<string>
  createdAt?: string
  updatedAt?: string
}
