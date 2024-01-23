import {
  Enemy,
  EnemyCategoryTypes,
  IEnemyPrefab,
} from "src/entities/enemy/enemy.model";
import { getItemPrefab } from "src/entities/item/item.factory";

export class AnimalEnemy extends Enemy {}

export const BearEnemyPrefab: IEnemyPrefab = {
  prefabId: "bear",
  name: 'Bear',
  category: EnemyCategoryTypes.Animal,
  health: 40,
  style: {
    bgColor: "0,0,0",
    mainColor: "100,24,24",
  },
  availableItems: [getItemPrefab("leather", [2, 5])],
  lifetimeSec: 12
};

export const WolfEnemyPrefab: IEnemyPrefab = {
  prefabId: "wolf",
  name: 'Wolf',
  category: EnemyCategoryTypes.Animal,
  health: 16,
  style: {
    bgColor: "0,0,0",
    mainColor: "120,112,112",
  },
  availableItems: [getItemPrefab("leather", [1, 3])],
  lifetimeSec: 5
};

export const prefabs: IEnemyPrefab[] = [BearEnemyPrefab, WolfEnemyPrefab];
