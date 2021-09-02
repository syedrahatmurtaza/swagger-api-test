import { model, Schema } from 'mongoose'
import { IOrderItem } from '../types/documents/orderItem.document'
import { dbColMenuItem, dbColOrderItem } from '../utils/constants'

export const OrderItemSchema = new Schema(
  {
    menuItem: {
      type: Schema.Types.ObjectId,
      ref: dbColMenuItem,
    },
    quantity: Number,
    totalPrice: Number,
  },
  { timestamps: true }
)

export const OrderItemModel = model<IOrderItem>(dbColOrderItem, OrderItemSchema)
