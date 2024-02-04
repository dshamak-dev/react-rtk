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
