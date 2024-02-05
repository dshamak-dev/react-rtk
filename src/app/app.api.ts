import { IApp } from "src/app/app.model";
import { MemoryDB } from "src/support/memoryDB";

const database = new MemoryDB<IApp>("app");
database.connect();

export const getApp = async (): Promise<IApp> => {
  const app = await database.get();

  return app || { pathname: null };
};

export const updateApp = async (payload: Object): Promise<IApp> => {
  const user = await database.set(payload);

  return user;
};
