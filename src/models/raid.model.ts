import { IResource } from "src/models/resource.model";
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
}

export interface ILevel {
  name: string;
  type: string;
  resources: IResource[];
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
      this.id = randomId();
    }
  }
}
