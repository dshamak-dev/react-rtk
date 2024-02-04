import {
  Enemy,
  EnemyCategoryTypes,
  IEnemyPrefab,
} from "src/namespaces/enemy/enemy.model";
import { getItemPrefab } from "src/namespaces/item/item.factory";

const _category = EnemyCategoryTypes.Goblin;

export class GoblinEnemy extends Enemy {}

export const SmallGoblinEnemyPrefab: IEnemyPrefab = {
  prefabId: "goblin-small",
  name: 'Goblin',
  category: _category,
  health: 10,
  style: {
    bgColor: "0,0,0",
    mainColor: "20,120,12",
  },
  lifetimeSec: 3,
  availableItems: [
    getItemPrefab("gold", [2, 5]),
    getItemPrefab("spear", [1, 3]),
  ],
};

export const prefabs: IEnemyPrefab[] = [SmallGoblinEnemyPrefab];
