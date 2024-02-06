import classNames from "classnames";
import React from "react";
import { handleNavigate } from "src/app/AppRouter";
import { ILevel } from "src/models/raid.model";

interface Props {
  level: ILevel;
}

export const LevelCard: React.FC<Props> = ({ level }) => {
  if (!level) {
    return null;
  }

  return (
    <div className={classNames('flex justify-center items-center', 'w-8 h-8 bg-black/40')}>
      <span>{level.name}</span>
    </div>
  );
};
