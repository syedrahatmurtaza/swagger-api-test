import { Body, Controller, Delete, Get, Path, Post, Route, Tags } from 'tsoa'
import { OrderRepository } from '../repositories/order.repository'
import { IOrder } from '../types/documents/order.document'
import {
  IOrderAddItemRequest,
  IOrderCreateRequest,
  IOrderDeleteItemRequest,
} from '../types/requests/order.request'
import {
  IOrderAddItemResponse,
  IOrderCreateResponse,
  IOrderGetOrder,
} from '../types/responses/order.resposne'

@Route('order')
@Tags('Order Management')
export class OrderController extends Controller {
  constructor() {
    super()
  }

  /**
   * This will create an order with the Id's for customer, waiter, table, Customer must be registered
   */
  @Post('/createOrder')
  async createOrder(
    @Body() order: IOrderCreateRequest
  ): Promise<IOrderCreateResponse> {
    const orderCreated = await new OrderRepository().createOrder(<IOrder>order)
    return <IOrderCreateResponse>orderCreated
  }

  /**
   * This will add the item in the order
   * @description It will create a OrderItem and then add the id of it to the order document
   */
  @Post('/addOrderItem')
  async addOrderItem(
    @Body() body: IOrderAddItemRequest
  ): Promise<IOrderAddItemResponse | null> {
    const orderItem = await new OrderRepository().addOrderItem(body)
    return <IOrderAddItemResponse | null>orderItem
  }

  /**
   * This will delete order item from the Order
   */
  @Delete('/deleteOrderItem')
  async deleteOrderItem(
    @Body() body: IOrderDeleteItemRequest
  ): Promise<IOrderAddItemResponse | null> {
    const orderItem = await new OrderRepository().deleteOrderItem(body)
    return <IOrderAddItemResponse | null>orderItem
  }

  /**
   * This will return order with details (populate used)
   */
  @Get('/getOrder/{orderId}')
  async getOrder(@Path() orderId: string): Promise<IOrderGetOrder | null> {
    const order = await new OrderRepository().getOrder(orderId)
    return <IOrderGetOrder | null>order
  }

  /**
   * This will return all of the orders based on the accessToken If it's the waiter he will only see his orders
   */
  @Post('/getAllOrders/{accessToken}')
  async getAllOrders(@Path() accessToken: string): Promise<IOrderGetOrder[]> {
    const orders = await new OrderRepository().getAllOrders(accessToken)
    return <any[]>orders
  }
}
