import express from 'express'
import { OrderController } from '../controllers/order.controller'
import { IOrderCreateRequest } from '../types/requests/order.request'

export class OrderRoutes {
  router: express.Router
  constructor() {
    this.router = express.Router()
    this.configureRoutes()
  }

  configureRoutes() {
    // Create Order
    this.router.post('/createOrder', async function (req, res, next) {
      const order: IOrderCreateRequest = req.body
      const orderCreated = await new OrderController().createOrder(order)
      res.send(orderCreated)
    })

    // Get Order
    this.router.get('/getOrder/:orderId', async function (req, res, next) {
      const orderId = req.params.orderId
      const order = await new OrderController().getOrder(orderId)
      res.send(order)
    })

    // Update Order
    this.router.post(
      '/updateOrder/:orderId',
      async function (req, res, next) {}
    )

    // Add Order Item
    this.router.post('/addOrderItem', async function (req, res, next) {
      const order = await new OrderController().addOrderItem(req.body)
      res.send(order)
    })

    // Delete Order Item
    this.router.delete('/deleteOrderItem', async function (req, res, next) {
      const order = await new OrderController().deleteOrderItem(req.body)
      res.send(order)
    })

    // Get All Orders
    this.router.post(
      '/getAllOrders/:accessToken',
      async function (req, res, next) {
        const orders = await new OrderController().getAllOrders(
          req.params.accessToken
        )

        res.send(orders)
      }
    )
  }
}

export const OrderRouter = new OrderRoutes().router
