import { IRaid } from "src/models/raid.model";
import { generateRaids } from "src/pages/lobby/lobby.factory";
import { LocalDB } from "src/support/localDB";

const database = new LocalDB<IRaid>("raids");
database.connect();

export const getRaids = async (): Promise<IRaid[]> => {
  const table = database.table;

  if (!table?.items?.length) {
    await database.set({
      items: generateRaids(),
    });
  }

  const items = await database.getItems();

  return items;
};

export const resetRaids = async (): Promise<IRaid[]> => {
  await database.reset();

  return getRaids();
};

export const getRaid = async (id: string): Promise<IRaid> => {
  const table = database.table;

  const raid = table?.items?.find((it) => it.id === id);

  return raid;
};

export const updateRaid = async (
  id: IRaid["id"],
  payload: Object
): Promise<IRaid> => {
  const table = database.table;

  const items = table.items || [];
  const targetIndex = items.findIndex((it) => it.id === id);

  if (targetIndex !== -1) {
    items.splice(targetIndex, 1, Object.assign(items[targetIndex], payload));

    await database.set({ items });
  }

  return database.table.items.find((it) => it.id === id);
};
