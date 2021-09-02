import express from 'express'
import { TableController } from '../controllers/table.controller'
import {
  ITableAddRequest,
  ITableUpdateRequest,
} from '../types/requests/table.request'

export class TableRoutes {
  router: express.Router

  constructor() {
    this.router = express.Router()
    this.configureRoutes()
  }

  configureRoutes() {
    // Add Table
    this.router.post('/addTable', async function (req, res, next) {
      const tableToAdd: ITableAddRequest = req.body
      const newTable = await new TableController().addTable(tableToAdd)
      res.send(newTable)
    })

    // Get Table
    this.router.get('/getTable/:tableId', async function (req, res, next) {
      const table = await new TableController().getTable(req.params.tableId)
      res.send(table)
    })

    // Update Table
    this.router.post('/updateTable', async function (req, res, next) {
      const tableToUpdate: ITableUpdateRequest = req.body
      const updatedTable = await new TableController().updateTable(
        tableToUpdate
      )
      res.send(updatedTable)
    })

    // Delete Table
    this.router.delete(
      '/deleteTable/:tableId',
      async function (req, res, next) {
        const deletedTable = await new TableController().deleteTable(
          req.params.tableId
        )
        res.send(deletedTable)
      }
    )

    // Get All Tables
    this.router.get('/getAllTables', async function (req, res, next) {
      const tables = await new TableController().getAllTables()
      res.send(tables)
    })
  }
}

export const TableRouter = new TableRoutes().router
