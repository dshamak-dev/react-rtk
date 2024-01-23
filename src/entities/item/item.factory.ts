import {
  IItem,
  IItemPrefab,
  ItemCategoryType,
  ItemType,
} from "src/entities/item/item.model";
import { ItemsCategoryMap } from "src/entities/item/item.prefabs";

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
  const category: ItemCategoryType = getItemCategory(type);

  return { category, minmax, type };
};

export const generateItems = (prefabs: IItemPrefab[]): IItem[] => {
  const items = prefabs.map((it) => {
    const { minmax, category, type } = it;
    const min = Number(minmax[0]) | 0;
    const max = Number(minmax[0]) | 1;
    const rand = Math.floor(Math.random() * (max - min)) + min;
    const number = Math.max(Math.min(rand, max), min);

    return { category, type, number, quality: null };
  });

  return items;
};
