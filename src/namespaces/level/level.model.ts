import { IRaid } from "src/models/raid.model";
import { IResource } from "src/models/resource.model";
import { randomId } from "src/support/random.support";

export interface ILevelPrefab {
  name: string;
  type: LevelTypes;
  resources: IResource[];
  cost: IResource[];
  raidId: IRaid['id'];
}

export interface ILevel extends ILevelPrefab {
  id: string;
}

export type LevelTypes = 'hammer' | 'spr';

export class Level implements ILevel {
  id: string;
  name: string;
  type: LevelTypes;
  resources: IResource[];
  cost: IResource[];
  raidId: IRaid['id'];
  

  constructor(props: ILevelPrefab) {
    Object.assign(this, props);

    if (!this.id) {
      this.id = randomId();
    }
  }
}