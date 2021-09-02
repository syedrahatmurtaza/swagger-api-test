import { model, Schema } from 'mongoose'
import { IMenuItem } from '../types/documents/menuItem.document'
import { dbColMenuItem } from '../utils/constants'

export const MenuItemSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    size: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
)

export const MenuItemModel = model<IMenuItem>(dbColMenuItem, MenuItemSchema)
