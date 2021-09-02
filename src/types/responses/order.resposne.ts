import { IUser } from '../documents/user.document'

export interface IOrderCreateResponse {
  _id: string
  customer: string
  waiter: string
  table: string
  items: Array<string>
  totalBill: number
  status: string
  createdAt: string
  updatedAt: string
}

export interface IOrderAddItemResponse {
  _id: string
  customer: string
  waiter: string
  table: string
  items: Array<string>
  totalBill: number
  status: string
  createdAt: string
  updatedAt: string
}

export interface IOrderGetOrder {
  _id: string
  customer: IOUserNoDoc
  waiter: IOUserNoDoc
  table: ITableNoDoc
  items: Array<IItemNoDoc>
  totalBill: number
  status: string
  createdAt: string
  updatedAt: string
}

export interface IItemNoDoc {
  _id: string
  menuItem: string
  quantity: number
  totalPrice: number
  createdAt?: string
  updatedAt?: string
}

export interface IOUserNoDoc {
  _id: string
  name: string
  email: string
  password: string
  userType: string
  accessToken?: string
  createdAt?: string
  updatedAt?: string
}

export interface ITableNoDoc {
  tableNo: number
  person: number
  createdAt?: string
  updatedAt?: string
}
