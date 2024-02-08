import { ILevel } from "src/namespaces/level/level.model";
import { ISession, GameSession } from "src/namespaces/session/session.model";
import { randomId } from "src/support/random.support";

export const createSession = (level: ILevel): ISession => {
  const props: ISession = {
    levelId: level.id,
    levelType: level.type,
    raidId: level.raidId,
    id: randomId(),
    startedAt: new Date().toISOString(),
  };

  const session = new GameSession(props);

  return session;
};
