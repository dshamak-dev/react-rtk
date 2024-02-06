import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useMemo } from "react";
import { dateDifference, timeToDateText } from "src/support/time.support";

interface Props {
  start?: string | number;
  end: string | number;
}

export const Duration: React.FC<Props> = ({ start, end }) => {
  const duration = useMemo(() => {
    const _start = start || Date.now();

    return timeToDateText(dateDifference(_start, end));
  }, [start, end]);

  return (
    <p
      className={classNames(
        "flex items-center gap-2",
        "w-fit px-2 py-1 rounded-xl",
        "text-xs bg-highlight text-black bg-default bg-opacity-80"
      )}
    >
      <span className="text-xs">
        <FontAwesomeIcon icon={faHourglassHalf} />
      </span>
      <span>{duration || "ENDED"}</span>
    </p>
  );
};
