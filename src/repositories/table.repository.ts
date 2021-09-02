import { Path } from 'tsoa'
import { TableModel } from '../models/table.model'
import { ITable } from '../types/documents/table.document'
import {
  ITableAddRequest,
  ITableUpdateRequest,
} from '../types/requests/table.request'
import { ITableAddUpdateResposne } from '../types/responses/table.response'

export class TableRepository {
  constructor() {}

  async addTable(table: ITableAddRequest) {
    if (await this.checkTableExist(table)) {
      return { errorCode: 200, message: 'Table Exist' }
    }

    const newTable = new TableModel(table).save()
    return newTable
  }

  async updateTable(table: ITableUpdateRequest) {
    const updateTable = await TableModel.findByIdAndUpdate(table._id, table)
    return updateTable
  }

  async getTable(tableId: string) {
    const table = await TableModel.findById(tableId)
    if (table == null) {
      return {
        statusCode: 200,
        message: 'Table Not Found',
      }
    }

    return table
  }

  async deleteTable(tableId: string) {
    const table = await TableModel.findByIdAndDelete(tableId)
    return table
  }

  async getAllTables() {
    return await TableModel.find()
  }

  async checkTableExist(table: ITableAddRequest): Promise<boolean> {
    const tempT: ITable[] = await TableModel.find().where(
      'tableNo',
      table.tableNo
    )
    console.log(tempT.length)
    if (tempT.length > 0) {
      return true
    }

    return false
  }
}
