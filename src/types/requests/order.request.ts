export interface IOrderCreateRequest {
  customer: string
  waiter: string
  table: string
}

export interface IOrderAddItemRequest {
  orderId: string
  menuItem: string
  quantity: number
}

export interface IOrderDeleteItemRequest {
  orderId: string
  orderItem: string
}
