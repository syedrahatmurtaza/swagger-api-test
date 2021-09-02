import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa'
import { TableRepository } from '../repositories/table.repository'
import {
  ITableAddRequest,
  ITableUpdateRequest,
} from '../types/requests/table.request'
import {
  ITableAddUpdateResposne,
  ITableGetResponse,
} from '../types/responses/table.response'

@Route('table')
@Tags('Table Management')
export class TableController extends Controller {
  constructor() {
    super()
  }

  /**
   * This will add a new table
   */
  @Post('/addTable')
  async addTable(
    @Body() table: ITableAddRequest
  ): Promise<ITableAddUpdateResposne> {
    const newTable = await new TableRepository().addTable(table)
    return <ITableAddUpdateResposne>newTable
  }

  /**
   * This will update an table
   */
  @Post('/updateTable')
  async updateTable(
    @Body() table: ITableUpdateRequest
  ): Promise<ITableAddUpdateResposne> {
    const updatedTable = await new TableRepository().updateTable(table)
    return <ITableAddUpdateResposne>updatedTable
  }

  /**
   * This will get a table
   */
  @Get('/getTable/{tableId}')
  async getTable(@Path() tableId: string): Promise<ITableGetResponse> {
    const table = await new TableRepository().getTable(tableId)
    return <ITableGetResponse>table
  }

  /**
   * This will delete an table
   */
  @Delete('/deleteTable/{tableId}')
  async deleteTable(@Path() tableId: string): Promise<ITableGetResponse> {
    const table = await new TableRepository().deleteTable(tableId)
    return <ITableGetResponse>table
  }

  /**
   * This will get All of the tables
   */
  @Get('/getAllTables')
  async getAllTables(): Promise<ITableGetResponse[]> {
    const tables = await new TableRepository().getAllTables()
    return <ITableGetResponse[]>tables
  }
}
