import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBroom,
  faCannabis,
  faCertificate,
  faCoins,
  faWandSparkles,
} from "@fortawesome/free-solid-svg-icons";
import {
  IItemPrefab,
  ItemCategoryType,
  ItemResourceType,
  ItemType,
  ItemWeaponType,
} from "src/entities/item/item.model";

export const ItemsCategoryMap: Record<ItemCategoryType, ItemType[]> = {
  armor: ["shirt", "hat", "gloves"],
  resource: ["gold", "fabric", "leather"],
  weapon: ["spear", "torch"],
  potion: ["heal", "damage"],
};

export const ItemIcons: Record<ItemType, IconProp> = {
  // Resources
  gold: faCoins,
  fabric: faCannabis,
  leather: faCertificate,
  // Armor
  shirt: null,
  hat: null,
  gloves: null,
  // Weapon
  spear: faWandSparkles,
  torch: faBroom,
  // Potion
  heal: null,
  damage: null,
};
