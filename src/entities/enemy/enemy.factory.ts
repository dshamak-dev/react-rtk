import {
  Enemy,
  EnemyCategoryTypes,
  IEnemyPrefab,
} from "src/entities/enemy/enemy.model";
import { AnimalEnemy, prefabs as animalPrefabs } from "src/entities/enemy/prefabs/enemy.animal";
import { GoblinEnemy, prefabs as goblinPrefabs } from "src/entities/enemy/prefabs/enemy.goblin";
import { generateItems } from "src/entities/item/item.factory";

export const getEnemyFactory = () => {};

export const createEnemy = (prefab: IEnemyPrefab | null) => {
  let factory;

  switch (prefab?.category) {
    case EnemyCategoryTypes.Animal: {
      factory = AnimalEnemy;
      break;
    }
    case EnemyCategoryTypes.Goblin: {
      factory = GoblinEnemy;
      break;
    }
    default: {
      factory = Enemy;
      break;
    }
  }

  if (factory) {
    return new factory(prefab || {});
  }

  return null;
};

export const createRandomEnemy = (available: IEnemyPrefab[] = null) => {
  const list = available || [].concat(animalPrefabs, goblinPrefabs);

  const rand = Math.floor(Math.random() * list.length) % list.length;

  const prefab: IEnemyPrefab = list[rand];

  const enemy = createEnemy(prefab);

  if (!enemy.items && !!enemy.availableItems?.length) {
    enemy.items = generateItems(enemy.availableItems);
  }

  return enemy;
};
