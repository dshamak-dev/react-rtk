import { IShopItem, ShopItem } from "src/models/shop.model";
import { randomNumber } from "src/support/random.support";

export const generateItems = (): IShopItem[] => {
  const prefabs: IShopItem[] = [
    {
      id: "health-potion",
      title: 'health',
      type: "potion",
      category: "consumable",
      quantity: randomNumber(2, 5, true),
      quality: "draft",
    },
    {
      id: "power-potion",
      title: 'power',
      type: "potion",
      category: "consumable",
      quantity: randomNumber(2, 5, true),
      quality: "draft",
    },
    {
      id: "speed-potion",
      type: "potion",
      title: 'speed',
      category: "consumable",
      quantity: randomNumber(2, 5, true),
      quality: "draft",
    },
  ];
  const items = prefabs.map((prefab: ShopItem) => {
    return new ShopItem(prefab);
  });

  return items;
};
