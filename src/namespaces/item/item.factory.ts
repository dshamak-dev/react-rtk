import {
  IItem,
  IItemPrefab,
  ItemCategoryType,
  ItemType,
} from "src/namespaces/item/item.model";
import { ItemsCategoryMap } from "src/namespaces/item/item.prefabs";

export const getItemCategory = (type): ItemCategoryType => {
  const res = Object.entries(ItemsCategoryMap).find(([category, types]) => {
    return types.includes(type);
  });

  if (!res) {
    return null;
  }

  return res[0] as ItemCategoryType;
};

export const getItemPrefab = (
  type: ItemType,
  minmax: [number, number]
): IItemPrefab => {
  const title = type;
  const category: ItemCategoryType = getItemCategory(type);

  return { title, category, minmax, type };
};

export const generateItems = (prefabs: IItemPrefab[]): IItem[] => {
  const items = prefabs.map((it) => {
    const { minmax, category, type, title } = it;
    const min = Number(minmax[0]) | 0;
    const max = Number(minmax[0]) | 1;
    const rand = Math.floor(Math.random() * (max - min)) + min;
    const quantity = Math.max(Math.min(rand, max), min);

    return { title, category, type, quantity, quality: null };
  });

  return items;
};
