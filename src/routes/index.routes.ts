import express from 'express'
import { MenuRouter } from './menu.routes'
import { MenuItemRouter } from './menuItem.routes'
import { OrderRouter } from './order.routes'
import { TableRouter } from './table.routes'
import { UserRouter } from './user.routes'

export class IndexRoute {
  router: express.Router

  constructor() {
    this.router = express.Router()
    this.setRoutes()
  }

  setRoutes() {
    // Default Route
    this.router.get('/', function (req, res, next) {
      res.redirect('/api-docs')
    })

    // User Routes
    this.router.use('/user', UserRouter)

    // Menu Routes
    this.router.use('/menu', MenuRouter)

    // Menu Item Routes
    this.router.use('/item', MenuItemRouter)

    // Table Routes
    this.router.use('/table', TableRouter)

    // Order Routes
    this.router.use('/order', OrderRouter)
  }

  /**
   * Format of the token is
   * Bearer <acessToken>
   */
  verifyToken(req: any, res: any, next: any) {
    // Get the Auth Header
    const bearerHeader = req.headers['authorization']

    if (bearerHeader !== undefined) {
      console.log(bearerHeader)

      const bearer = bearerHeader.split(' ')

      const bearerToken = bearer[1]

      req.token = bearerToken

      next()
    } else {
      console.log(bearerHeader)

      res.sendStatus(403)
    }
  }
}

export const MainRouter = new IndexRoute().router
