import { access } from 'fs'
import { OrderModel } from '../models/order.model'
import { OrderItemModel } from '../models/orderItem.model'
import { UserModel } from '../models/user.model'
import { IOrder } from '../types/documents/order.document'
import { IOrderItem } from '../types/documents/orderItem.document'
import { IUser } from '../types/documents/user.document'
import {
  IOrderAddItemRequest,
  IOrderDeleteItemRequest,
} from '../types/requests/order.request'
import { MenuItemRepository } from './menuItem.repository'

export class OrderRepository {
  constructor() {}

  async createOrder(order: IOrder) {
    order.status = 'Processing'
    order.items = new Array<string>()
    order.totalBill = 0
    const orderCreated = await new OrderModel(order).save()
    return orderCreated
  }

  async addOrderItem(orderItem: IOrderAddItemRequest) {
    let order: IOrder | null = await OrderModel.findById(orderItem.orderId)
    if (order) {
      const menuItem = await new MenuItemRepository().getMenuItem(
        orderItem.menuItem
      )
      let orderItemCreated: IOrderItem | null = await new OrderItemModel(
        orderItem
      ).save()
      if (menuItem) {
        orderItemCreated.totalPrice =
          menuItem?.price * orderItemCreated.quantity

        orderItemCreated = await OrderItemModel.findOneAndUpdate(
          { _id: orderItemCreated._id },
          orderItemCreated,
          {
            returnOriginal: false,
          }
        )
        order?.items.push(orderItemCreated?._id)
        if (orderItemCreated)
          order.totalBill = order.totalBill + orderItemCreated.totalPrice
        order = await OrderModel.findOneAndUpdate({ _id: order._id }, order, {
          returnOriginal: false,
        })
      }
    }
    order = await OrderModel.findById(order?._id)
    return order
  }

  async deleteOrderItem(request: IOrderDeleteItemRequest) {
    let order: IOrder | null = await OrderModel.findById(request.orderId)
    if (order !== null) {
      order.items = order.items.filter(function (value, index, arr) {
        return value != request.orderItem
      })

      console.log(order.items)

      order = await OrderModel.findOneAndUpdate({ _id: order._id }, order, {
        returnOriginal: false,
      })
    }

    order = await OrderModel.findById(order?._id)
    return order
  }

  async getOrder(orderId: string) {
    const order: any = await OrderModel.findById(orderId)
      .populate('customer waiter table items')
      .exec()

    let price = 0
    if (order !== null) {
      for (let i = 0; i < order.items.length; i++) {
        price = price + order.items[i].totalPrice
      }
      order.totalBill = price
      order.status = 'Complete'
      await OrderModel.findOneAndUpdate({ _id: order._id }, order, {
        returnOriginal: false,
      })
    }

    return order
  }

  async getAllOrders(accessToken: string) {
    const user: IUser[] = await UserModel.find().where(
      'accessToken',
      accessToken
    )
    let orders
    if (user != null) {
      if (user[0].userType == 'Waiter') {
        orders = await OrderModel.find().where('waiter', user[0]._id)
        return orders
      } else {
        orders = await OrderModel.find()
        return orders
      }
    }
  }
}
