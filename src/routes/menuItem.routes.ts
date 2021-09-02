import express from 'express'
import { MenuItemController } from '../controllers/menuItem.controller'

class PizzaRoutes {
  router: express.Router

  constructor() {
    this.router = express.Router()
    this.configRoutes()
  }

  configRoutes() {
    // Add Pizza
    this.router.post('/addItem', async function (req, res, next) {
      let itemAdded = await new MenuItemController().addItem(req.body)
      res.send(itemAdded)
    })

    this.router.delete('/deleteItem', async function (req, res, next) {
      let deletedItem = await new MenuItemController().deleteItem(req.body)
      res.send(deletedItem)
    })
  }
}

export const MenuItemRouter = new PizzaRoutes().router
