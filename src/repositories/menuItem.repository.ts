import { MenuItemModel } from '../models/menuItem.model'
import { IMenuItem } from '../types/documents/menuItem.document'

export class MenuItemRepository {
  constructor() {}

  addMenuItem(item: IMenuItem) {
    return new MenuItemModel(item).save()
  }

  deleteMenuItem(_id: string) {
    return MenuItemModel.deleteOne({ _id: _id })
  }

  getMenuItem(_id: string) {
    return MenuItemModel.findById(_id)
  }
}
