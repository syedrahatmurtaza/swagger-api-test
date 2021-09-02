import { Document } from 'mongoose'

export interface IUser extends Document {
  _id: string
  name: string
  email: string
  password: string
  userType: string
  accessToken?: string
  createdAt?: string
  updatedAt?: string
}
