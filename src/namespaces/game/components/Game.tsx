import React, { FC, PropsWithoutRef, useMemo } from "react";
import { HammerGame } from "src/namespaces/game/components/HammerGame";
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
      case "hammer": {
        return <HammerGame sessionId={session?.id} onChange={onChange}  />
      }
      default: {
        return null;
      }
    }
  }, [JSON.stringify(session)]);

  return content;
}

export default Game;
