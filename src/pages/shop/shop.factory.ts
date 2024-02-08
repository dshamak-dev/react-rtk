import { IShopItem, ShopItem } from "src/models/shop.model";
import { generateResource } from "src/namespaces/resource/resource.factory";
import { randomNumber } from "src/support/random.support";

export const generateItems = (): IShopItem[] => {
  const prefabs: IShopItem[] = [
    {
      id: "small-energy-potion",
      title: "energy x5",
      type: "potion",
      category: "consumable",
      quantity: randomNumber(2, 5, true),
      quality: "draft",
      effects: [generateResource("energy", { fixed: 5 })],
      price: [generateResource("coin", { fixed: 3 })],
    },
    {
      id: "energy-potion",
      title: "energy x10",
      type: "potion",
      category: "consumable",
      quantity: randomNumber(2, 5, true),
      quality: "draft",
      effects: [generateResource("energy", { fixed: 10 })],
      price: [generateResource("coin", { fixed: 5 })],
    },
  ];
  const items = prefabs.map((prefab: ShopItem) => {
    return new ShopItem(prefab);
  });

  return items;
};
