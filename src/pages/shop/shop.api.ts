import { IShop, IShopItem } from "src/models/shop.model";
import { generateItems } from "src/pages/shop/shop.factory";
import { removeShopItems } from "src/pages/shop/shop.support";
import { delayMS } from "src/support/api.support";
import { LocalDB } from "src/support/localDB";
import { copyObject } from "src/support/object.support";
import { dateToMS } from "src/support/time.support";

const database = new LocalDB<IShopItem>("shop");
database.connect();

export const getShopItems = async (): Promise<IShopItem[]> => {
  const refreshedAt = new Date(database.table.refreshedAt || null).getTime();
  const now = Date.now();
  const passed = now - refreshedAt;
  const refreshDelay = dateToMS({ hours: 1 });
  const shouldRefresh = passed >= refreshDelay;

  if (shouldRefresh) {
    await database.set({
      refreshedAt: now,
      updatedAt: now,
      items: generateItems(),
    });
  }

  const items = await database.getItems();

  return items;
};

export const claimShopItems = async (
  items: IShopItem[]
): Promise<IShopItem[]> => {
  const shopItems = copyObject(database.items) || [];
  removeShopItems(shopItems, items);

  await database.set({ items: shopItems });

  await delayMS(2000);

  return items;
};
