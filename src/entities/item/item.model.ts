export type ItemCategoryType = "weapon" | "potion" | "armor" | 'resource';


export type ItemWeaponType = "spear" | "torch";
export type ItemResourceType = "gold" | "leather" | "fabric";
export type ItemPotionType = "heal" | "damage";
export type ItemClothnType = "hat" | "gloves" | "shirt";

export type ItemType = ItemWeaponType | ItemResourceType | ItemPotionType | ItemClothnType;
export type ItemQualityType = string;

export interface IItemPrefab {
  type: ItemType;
  category: ItemCategoryType;
  minmax?: [number, number];
}
export interface IItem {
  type: ItemType;
  category: ItemCategoryType;
  number: number;
  quality: ItemQualityType;
}
