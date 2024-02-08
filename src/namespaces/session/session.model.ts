import { IRaid } from "src/models/raid.model";
import { IResource } from "src/models/resource.model";
import { ILevel, LevelTypes } from "src/namespaces/level/level.model";

export interface ISession {
  id: string;
  levelType: LevelTypes;
  startedAt: string | number;
  levelId: ILevel['id'];
  raidId: IRaid['id'];
  completed?: boolean;
  claimed?: boolean;
}

export class GameSession implements ISession {
  id: string;
  levelType: LevelTypes;
  startedAt: string | number;
  levelId: ILevel['id'];
  raidId: IRaid['id'];

  constructor(props) {
    Object.assign(this, props);
  }
}