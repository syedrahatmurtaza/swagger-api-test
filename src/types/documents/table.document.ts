import { Document } from 'mongoose'

export interface ITable extends Document {
  tableNo: number
  person: number
  createdAt?: string
  updatedAt?: string
}
