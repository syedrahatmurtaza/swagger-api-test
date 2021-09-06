import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa'
import { MenuItemRepository } from '../repositories/menuItem.repository'
import { OrderRepository } from '../repositories/order.repository'
import { IMenuItem } from '../types/documents/menuItem.document'
import {
  IMenuItemAddRequest,
  IMenuItemDeleteRequest,
} from '../types/requests/menuItem.request'
import {
  IMenuItemAddResponse,
  IMenuItemDeleteResponse,
} from '../types/responses/menuItem.response'
import { IOrderGetOrder } from '../types/responses/order.resposne'

@Route('menuItem')
@Tags('MenuItem Management')
export class MenuItemController extends Controller {
  constructor() {
    super()
  }

  /**
   * @summary This will add new item to the system
   */
  @Post('/addItem')
  async addItem(
    @Body() reqBody: IMenuItemAddRequest
  ): Promise<IMenuItemAddResponse> {
    let itemAdded: IMenuItem = await new MenuItemRepository().addMenuItem(
      <IMenuItem>reqBody
    )
    return <IMenuItemAddResponse>itemAdded
  }

  /**
   * This will delete an Item from the System
   */
  @SuccessResponse('200', 'MenuItem Deleted Succesfully')
  @Delete('/deleteItem')
  async deleteItem(
    @Body() reqBody: IMenuItemDeleteRequest
  ): Promise<IMenuItemDeleteResponse> {
    let itemDeleted: any = await new MenuItemRepository().deleteMenuItem(
      reqBody._id
    )
    return <IMenuItemDeleteResponse>itemDeleted
  }
}
