import { model, Schema } from 'mongoose'
import { ITable } from '../types/documents/table.document'
import { dbColTable } from '../utils/constants'

export const ITableSchema = new Schema(
  {
    tableNo: Number,
    person: Number,
  },
  { timestamps: true }
)

export const TableModel = model<ITable>(dbColTable, ITableSchema)
