import { IShopItem } from "src/models/shop.model";

export const removeShopItems = (current: IShopItem[], payload: IShopItem[]) => {
  const items = current || [];

  const itemsMap = items.reduce((prev, it) => {
    return { ...prev, [it.id]: it };
  }, {});

  payload.forEach((it) => {
    const target = itemsMap[it.id];

    if (target) {
      target.quantity -= it.quantity;
    }
  });

  return items;
};
