import { compareObject } from "src/support/object.support";

export interface ITable<T> {
  updatedAt: number | string;
  refreshedAt: number | string;
  items: T[];
}

export class LocalDB<T> {
  name: string;

  private _storage = localStorage;
  private _table: ITable<T>;

  get table() {
    const { updatedAt, refreshedAt } = this._table || {};

    return {
      updatedAt,
      refreshedAt,
      items: this.items.slice().map((it) => Object.assign({}, it)),
    };
  }

  get items(): T[] {
    return this._table?.items || [];
  }

  constructor(name) {
    this.name = name;
  }

  async connect(): Promise<boolean> {
    const record = this._storage.getItem(this.name);

    try {
      this._table = record ? JSON.parse(record) || {} : {};
    } catch (err) {
      return false;
    }

    return true;
  }

  async getItems(query = null): Promise<T[]> {
    const items = this.items.filter((it) => {
      if (!query) {
        return true;
      }

      return compareObject(query, it);
    });

    return items;
  }

  async add(record: T): Promise<T> {
    const item = record;

    this._table.items.push(item);

    await this.save();

    return item;
  }

  async updateItems(query, record: Object) {
    this._table.items = this.items.map((it) => {
      const match = compareObject(query, it);

      if (!match) {
        return it;
      }

      return Object.assign({}, it, record);
    });

    this._table.updatedAt = Date.now();

    await this.save();
  }

  async set(record: Object) {
    this._table = Object.assign({}, this._table, record);

    await this.save();
  }

  async remove(query) {
    this._table.items = this.items.filter((it) => !compareObject(query, it));

    await this.save();
  }

  async save(): Promise<boolean> {
    const table = {
      ...this._table,
      items: this.items,
    };

    this._storage.setItem(this.name, JSON.stringify(table));

    return true;
  }
}
