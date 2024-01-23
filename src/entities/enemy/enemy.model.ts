import { getItemPrefab } from "src/entities/item/item.factory";
import { IItem, IItemPrefab } from "src/entities/item/item.model";

export interface IEnemyPrefab {
  category: EnemyCategoryTypes;
  prefabId: string;
  name: string;
  health: number;
  type?: EnemyTypes;
  style: IEnemyStyle;
  availableItems?: IItemPrefab[];
  lifetimeSec?: number;
}

export enum EnemyCategoryTypes {
  Unknown,
  Animal,
  Goblin,
  Demon,
  Chimera,
  Witch,
}

export type EnemyTypes = "unknown";

export interface IEnemyStyle {
  bgColor: string;
  mainColor: string;
}

export class Enemy {
  type: string = "draft";
  experience: number = 1;
  health: number = 1;
  color: string = "fff,fff,fff";
  availableItems: IItemPrefab[] = [];
  items: IItem[];
  lifetimeSec: number = 30;
  createdAt: string | number;

  constructor({ type, ...props }: any) {
    Object.assign(this, props);

    if (!this.createdAt) {
      this.createdAt = Date.now();
    }
  }
}

export const validateEnemyHealth = (enemy: Enemy | null): boolean => {
  if (enemy == null) {
    return false;
  }

  const health = Number(enemy.health) || 0;

  if (health <= 0) {
    return false;
  }

  return true;
};
