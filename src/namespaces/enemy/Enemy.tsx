import { useDispatch, useSelector } from "react-redux";

import React, { useMemo } from "react";
import classNames from "classnames";

import "./enemy.style.css";
import { battleActions, battleSelector } from "src/store/battle.store";
import { Timer } from "src/components/molecules/Timer";

export const Enemy = () => {
  const { enemy } = useSelector(battleSelector);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(battleActions.hitEnemy(1));
  };

  const handleTimeEnd = () => {
    // todo: apply enemy effect (attack or else)
    dispatch(battleActions.removeEnemy());
  };

  const canUseTimer = useMemo(() => {
    return !!enemy?.createdAt;
  }, [enemy?.createdAt]);

  return (
    <div>
      {
        canUseTimer ? <Timer startAt={enemy.createdAt} duration={enemy.lifetimeSec} onEnd={handleTimeEnd} /> : null
      }
      <div
        className={classNames(
          "enemy",
          "grid grid-rows-[auto_1fr] gap-2 items-center justify-center",
          "text-center w-[50vw] h-[50vw]",
          "border shadow-md"
        )}
        style={{ ["--bg-rgb"]: enemy.style?.bgColor } as any}
        onClick={handleClick}
      >
        <b className="blend">{enemy.name}</b>
        <span className="blend text-2xl">{enemy.health}</span>
      </div>
    </div>
  );
};
