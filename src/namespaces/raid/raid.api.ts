import { IRaid } from "src/models/raid.model";
import { generateRaids } from "src/pages/lobby/lobby.factory";
import { LocalDB } from "src/support/localDB";

const db = new LocalDB<IRaid>("raids");
db.connect();

export const getRaids = async (): Promise<IRaid[]> => {
  const table = db.table;

  if (!table?.items?.length) {
    await db.set({
      items: generateRaids(),
    });
  }

  const items = await db.getItems();

  return items;
};

export const getRaid = async (id: string): Promise<IRaid> => {
  const table = db.table;

  const raid = table?.items?.find((it) => it.id === id);

  return raid;
};

export const updateRaid = async (
  id: IRaid["id"],
  payload: Object
): Promise<IRaid> => {
  const table = db.table;

  const items = table.items || [];
  const targetIndex = items.findIndex((it) => it.id === id);

  if (targetIndex !== -1) {
    items.splice(targetIndex, 1, Object.assign(items[targetIndex], payload));

    await db.set({ items });
  }

  return db.table.items.find((it) => it.id === id);
};
