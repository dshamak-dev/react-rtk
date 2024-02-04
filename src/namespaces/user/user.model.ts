import { IResource } from "src/models/resource.model";
import { IItem } from "src/namespaces/item/item.model";

export interface IUser {
  items: IItem[];
  resources: IResource[];
}

export class User implements IUser {
  items: IItem[] = [];
  resources: IResource[] = [];

  constructor(props = {}) {
    Object.assign(this, props);
  }
}