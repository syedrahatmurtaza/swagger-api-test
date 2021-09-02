import { MenuModel } from '../models/menu.model'
import { IMenu } from '../types/documents/menu.document'
import { IMenuInsertItemRequest } from '../types/requests/menu.request'
import { IMenuInsertItemResponse } from '../types/responses/menu.resposne'
import { dbColMenuPopulateItems, dbColMenuItem } from '../utils/constants'

export class MenuRepository {
  constructor() {}

  async createMenu(menu: IMenu) {
    menu.items = new Array<string>()
    return await new MenuModel(menu).save()
  }

  async insertMenuItem(menuIdWithItemId: IMenuInsertItemRequest) {
    let menu: IMenu | null = await MenuModel.findById(menuIdWithItemId._id)
    if (menu) {
      menu?.items.push(menuIdWithItemId.item._id)
      menu = await MenuModel.findOneAndUpdate({ _id: menu._id }, menu, {
        returnOriginal: false,
      })
    }
    menu = await MenuModel.findById(menu?._id)
    return menu
  }

  async getAllMenus() {
    let menu: IMenu[] = await MenuModel.find()
      .populate(dbColMenuPopulateItems)
      .exec()
    return menu
  }
}
