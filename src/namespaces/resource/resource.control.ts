import { IResource } from "src/models/resource.model";
import { copyObject } from "src/support/object.support";

export const appendResources = (
  current: IResource[],
  payload: IResource[]
): IResource[] => {
  if (!payload?.length) {
    return current;
  }

  const storeResources = copyObject(current) || [];

  const resources = payload.reduce((prev, item) => {
    let next = prev.slice();
    let index = next.findIndex((it) => it.type === item.type);
    let res =
      index === -1
        ? {
            type: item.type,
            value: 0,
          }
        : prev[index];

    res.value += item.value;

    if (index === -1) {
      next.push(res);
    }

    return next;
  }, storeResources);

  return resources;
};

export const removeResources = (
  current: IResource[],
  payload: IResource[]
): IResource[] => {
  if (!payload?.length) {
    return current;
  }

  const storeResources = copyObject(current) || [];

  const resources = payload.reduce((prev, item) => {
    let next = prev.slice();
    let index = next.findIndex((it) => it.type === item.type);
    let res =
      index === -1
        ? {
            type: item.type,
            value: 0,
          }
        : prev[index];

    res.value -= item.value;

    if (index === -1) {
      next.push(res);
    }

    return next;
  }, storeResources);

  return resources;
};
