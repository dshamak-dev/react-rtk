import { ILevel } from "src/namespaces/level/level.model";
import { createSession } from "src/namespaces/session/session.factory";
import { ISession } from "src/namespaces/session/session.model";
import { MemoryDB } from "src/support/memoryDB";
import { concatObjects, copyObject } from "src/support/object.support";

type SessionDB = Record<ISession["id"], ISession>;

const database = new MemoryDB<SessionDB>("sessions");
database.connect();

export const getSessions = async (): Promise<SessionDB> => {
  const sessions = database.table || {};

  return sessions;
};

export const postSession = async (level: ILevel): Promise<ISession> => {
  const all = await getSessions();

  const session = createSession(level);

  all[session.id] = session;

  await database.set(all);

  return copyObject(session);
};

export const findSession = async (id: ISession["id"]): Promise<ISession> => {
  const all = await getSessions();

  const session = all[id];

  if (!session) {
    return null;
  }

  return copyObject(session);
};

export const updateSession = async (
  id: ISession["id"],
  payload: Object
): Promise<ISession> => {
  const all = await getSessions();

  const session = await findSession(id);

  if (!session) {
    return null;
  }

  const update = concatObjects(session, payload);
  all[session.id] = update;

  await database.set(all);

  return copyObject(update);
};
