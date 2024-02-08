import {
  faAngleDown,
  faDungeon,
  faHammer,
  faHandScissors,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useMemo } from "react";
import { handleNavigate } from "src/app/AppRouter";
import { ILevel } from "src/namespaces/level/level.model";
import { getLevelIcon } from "src/namespaces/level/level.support";

interface Props {
  level: ILevel;
  completed?: boolean;
  active?: boolean;
}

export const LevelCard: React.FC<Props> = ({ level, completed, active }) => {
  if (!level) {
    return null;
  }

  const { name, type } = level;

  const levelIcon = useMemo(() => {
    if (!completed && !active) {
      return faLock;
    }

    return getLevelIcon(type);
  }, [type, completed, active]);

  return (
    <div
      className={classNames(
        "relative flex justify-center items-center",
        "p-2",
        "text-2xl",
        {
          "opacity-50": completed || !active,
          "text-white bg-black/50": !active,
          "border-2 border-white text-white bg-black": active,
        }
      )}
      data-id={level.id}
      title={level.name}
    >
      {active ? (
        <div
          className={classNames(
            "absolute left-0 bottom-full",
            "w-full flex justify-center",
            "text-white text-base",
            "animation-bounce"
          )}
        >
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      ) : null}
      <div
        className={classNames("flex justify-center items-center", "w-8 h-8")}
      >
        <FontAwesomeIcon icon={levelIcon} />
      </div>
    </div>
  );
};
