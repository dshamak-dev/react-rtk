import { IRaid } from "src/models/raid.model";
import { generateRaids, generateTutorialRaid } from "src/namespaces/raid/raid.factory";
import { LocalDB } from "src/support/localDB";
import { concatObjects } from "src/support/object.support";

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

export const deleteRaid = async (id) => {
  const table = database.table;

  let isTutorialRaid = false;
  const items = (table.items || []).filter((it) => {
    const match = it.id === id

    if (match && it.name === 'training dungeon') {
      isTutorialRaid = true;
    }

    return it.id !== id;
  });
  
  if (isTutorialRaid) {
    items.unshift(generateTutorialRaid());
  }

  await database.set({ items });
};

export const updateRaidLevel = async (raidId: IRaid["id"], payload) => {
  const raid = await getRaid(raidId);

  if (!raid) {
    return null;
  }

  raid.levels = raid.levels.reduce((prev, it) => {
    let level = it;

    if (it.id === payload.id) {
      level = concatObjects(it, payload);
    }

    return [...prev, level];
  }, []);

  return updateRaid(raidId, raid);
};
