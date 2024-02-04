import { IResource } from "src/models/resource.model";
import { appendItems, removeItems } from "src/namespaces/item/item.control";
import { IItem } from "src/namespaces/item/item.model";
import {
  appendResources,
  removeResources,
} from "src/namespaces/resource/resource.control";
import { IUser, User } from "src/namespaces/user/user.model";
import { MemoryDB } from "src/support/memoryDB";

const database = new MemoryDB<IUser>("user");
database.connect();

export const getUser = async (): Promise<IUser> => {
  const user = await database.get();

  return user || new User();
};

export const updateUser = async (payload: Object): Promise<IUser> => {
  const user = await database.set(payload);

  return user;
};

export const postUserResources = async (
  payload: IResource[]
): Promise<IUser> => {
  const user = await getUser();
  const resources = appendResources(user.resources, payload);

  await database.set({ resources });

  return database.get();
};

export const deleteUserResources = async (
  payload: IResource[]
): Promise<IUser> => {
  const user = await getUser();
  const resources = removeResources(user.resources, payload);

  await database.set({ resources });

  return database.get();
};

export const postUserItems = async (payload: IItem[]): Promise<IUser> => {
  const user = await getUser();
  const { items } = user;

  const body = appendItems(items || [], payload);
  await database.set({ items: body });

  return await database.get();
};

export const removeUserItems = async (payload: IItem[]): Promise<IUser> => {
  const { items } = await database.get();

  const body = removeItems(items || [], payload);
  await database.set({ items: body });

  return await database.get();
};
