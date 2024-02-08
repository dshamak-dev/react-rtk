import { IResource } from "src/models/resource.model";
import { ILevel, ILevelPrefab } from "src/namespaces/level/level.model";
import { randomId } from "src/support/random.support";
import { isDateBefore } from "src/support/time.support";

export interface IRaid {
  id: string;
  type: string;
  name: string;
  levels: ILevel[];
  resources: IResource[];
  startDate: string | number;
  endDate: string | number;
  bgImageUrl?: string;
  previewImageUrl?: string;
}

export class Raid implements IRaid {
  id: string;
  type: string;
  name: string;
  levels: ILevel[] = [];
  resources: IResource[] = [];
  startDate: string | number;
  endDate: string | number;

  get active(): boolean {
    return isDateBefore(this.startDate, this.endDate);
  }

  constructor(props: IRaid) {
    Object.assign(this, props);

    if (!this.id) {
      const id = this.id = randomId();

      this.levels.forEach((level) => {
        level.raidId = id;
      });
    }
  }
}
