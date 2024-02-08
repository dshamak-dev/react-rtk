import React, { FC, PropsWithoutRef, useMemo } from "react";
import { SPRGame } from "src/namespaces/game/components/SPRGame";
import { ISession } from "src/namespaces/session/session.model";

interface Props extends PropsWithoutRef<any> {
  session: ISession;
}

export function Game({ session, onChange }) {
  const content = useMemo(() => {
    switch (session?.levelType) {
      case "spr": {
        return <SPRGame session={session} onChange={onChange} />;
      }
      default: {
        return null;
      }
    }
  }, [JSON.stringify(session)]);

  return content;
}

export default Game;
