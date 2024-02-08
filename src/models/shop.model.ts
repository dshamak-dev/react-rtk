import { IResource } from "src/models/resource.model";
import {
  IItem,
  ItemCategoryType,
  ItemType,
} from "src/namespaces/item/item.model";
import { randomId } from "src/support/random.support";

export interface IShop {
  updatedAt?: Date;
  list: IShopItem[];
}

export interface IShopItem extends IItem {
  price?: IResource[];
}

export class ShopItem implements IShopItem {
  id?: string;
  title: string;
  category: ItemCategoryType;
  type: ItemType;
  price?: IResource[];
  quantity: number;
  quality: string = 'draft';

  constructor(props: IShopItem) {
    Object.assign(this, props);

    if (!this.price) {
      this.price = [{ type: "coin", value: 2 }];
    }

    if (!this.quantity) {
      this.quantity = 1;
    }

    if (!this.id) {
      this.id = randomId();
    }
  }
}
