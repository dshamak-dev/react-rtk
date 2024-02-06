import { appendItems } from "src/namespaces/item/item.control";
import { IItem } from "src/namespaces/item/item.model";
import { LocalDB } from "src/support/localDB";

const database = new LocalDB<IItem>("items");
database.connect();

export const getItems = async (): Promise<IItem[]> => {
  const items = await database.getItems();

  return items || [];
};

export const resetItems = async (): Promise<IItem[]> => {
  await database.reset();

  return database.getItems();
};

export const addItems = async (payload: IItem[]): Promise<IItem[]> => {
  const items = await database.getItems();

  const body = appendItems(items || [], payload);
  await database.set({ items: body });

  return await database.getItems();
};
