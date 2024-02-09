import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "src/components/Button";
import { Loader } from "src/components/atoms/Loader";
import { HammerGrid } from "src/namespaces/game/components/molecules/HammerGrid";
import { findSession } from "src/namespaces/session/session.api";
import { ISession } from "src/namespaces/session/session.model";
import { concatObjects, copyObject } from "src/support/object.support";
import { randomNumber } from "src/support/random.support";

interface Props {
  sessionId: ISession["id"];
  onChange: (state) => void;
}

const defaultState = {
  grid: { size: 3 },
  counter: 0,
  goal: randomNumber(15, 25, true),
  speed: 1,
};

export const HammerGame: React.FC<Props> = ({ sessionId, onChange }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [state, setState] = useState(null);

  const handleLoad = async () => {
    setLoading(true);

    const _session = await findSession(sessionId);
    const _state = _session?.state || copyObject(defaultState);

    setSession(_session);
    setState(_state);

    setLoading(false);
  };

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    handleLoad();
  }, [sessionId]);

  const handleEnd = () => {
    onChange(session);
  };

  useEffect(() => {
    if (!state || session?.completed) {
      return;
    }

    const completed = state.counter >= state.goal;
    const update = concatObjects(session, { completed, state });

    setSession(update);
  }, [state]);

  const canPlay = useMemo(() => {
    return !session?.completed;
  }, [session]);

  const handleHit = useCallback(({ column }) => {
    setState((prev) => {
      let counter = prev.counter || 0;
      counter += 1;

      return concatObjects(prev, { counter });
    });
  }, []);

  if (!state) {
    return loading ? (
      <div className="text-4xl">
        <Loader />
      </div>
    ) : (
      <div>nothing here, please leave</div>
    );
  }

  return (
    <div className={classNames("flex flex-col gap-8")}>
      <div className={classNames("flex flex-col gap-2", "text-center")}>
        <div>Score</div>
        <div className={classNames("flex justify-center items-center gap-2")}>
          <span>{state.counter || 0}</span>
          <span>/</span>
          <span>{state.goal || 1}</span>
        </div>
      </div>
      {canPlay ? (
        <HammerGrid size={state.grid.size} onHit={handleHit} />
      ) : (
        <div className={classNames("flex flex-col gap-4 items-center")}>
          <div className="uppercase text-center">{session?.completed ? "you won" : "Game Over"}</div>
          <Button onClick={handleEnd}>go back</Button>
        </div>
      )}
    </div>
  );
};
