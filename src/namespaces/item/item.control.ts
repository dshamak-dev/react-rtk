import { IItem } from "src/namespaces/item/item.model";
import { copyObject } from "src/support/object.support";

export const appendItems = (current: IItem[], payload: IItem[]): IItem[] => {
  if (!payload?.length) {
    return current;
  }

  const prevItems = copyObject(current) || [];
  const entries = payload.reduce((prev, it) => {
    const { id, quantity } = it;
    const item = copyObject(prev[id] || { ...it, quantity: 0 });
    item.quantity += quantity || 1;

    return { ...prev, [id]: item };
  }, prevItems);

  return Object.values(entries);
};

export const removeItem = (items: IItem[], payload: IItem) => {
  const filtred = (items || []).filter((it) => {
    return it.id !== payload?.id;
  });

  return filtred;
};

export const removeItems = (items: IItem[], payload: IItem[]) => {
  const filtred = payload.reduce((prev, item) => {
    return removeItem(prev, item);
  }, items);

  return filtred;
};
