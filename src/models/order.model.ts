import { model, Schema } from 'mongoose'
import { IOrder } from '../types/documents/order.document'
import {
  dbColOrder,
  dbColOrderItem,
  dbColTable,
  dbColUser,
} from '../utils/constants'

export const OrderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: dbColUser,
  },
  waiter: {
    type: Schema.Types.ObjectId,
    ref: dbColUser,
  },
  table: {
    type: Schema.Types.ObjectId,
    ref: dbColTable,
  },
  items: [{ type: Schema.Types.ObjectId, ref: dbColOrderItem }],
  totalBill: Number,
  status: String,
})

export const OrderModel = model<IOrder>(dbColOrder, OrderSchema)
