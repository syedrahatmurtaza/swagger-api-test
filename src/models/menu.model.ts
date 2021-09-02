import { model, Schema } from 'mongoose'
import { IMenu } from '../types/documents/menu.document'
import { dbColMenu, dbColMenuItem } from '../utils/constants'

const MenuSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: dbColMenuItem,
      },
    ],
  },
  { timestamps: true }
)

export const MenuModel = model<IMenu>(dbColMenu, MenuSchema)
