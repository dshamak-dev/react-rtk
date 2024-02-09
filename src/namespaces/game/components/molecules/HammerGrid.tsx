import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { randomArrayItem } from "src/support/random.support";

interface Props {
  size: number;
  onHit: (props) => void;
}

export const HammerGrid: React.FC<Props> = ({ size = 2, onHit }) => {
  const [targets, setTargets] = useState<number[]>([]);

  const columns = useMemo(() => {
    return [...Array(Math.pow(size, 2))];
  }, [size]);

  const availableIndexes = useMemo(() => {
    return columns
      .map((_, index) => index)
      .filter((it) => {
        return !targets.includes(it);
      });
  }, [columns, targets]);

  const handleTick = useCallback(() => {
    setTargets((prev) => {
      const index = randomArrayItem(availableIndexes);

      return [index];
    });
  }, [availableIndexes]);

  const handleClick = useCallback(
    (index) => {
      const isHit = targets.includes(index);

      if (isHit) {
        onHit({ column: index });

        handleTick();
      }
    },
    [handleTick, targets]
  );

  useEffect(() => {
    handleTick();
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      handleTick();
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [targets]);

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${size}, auto)` }}
      className={classNames("grid gap-8")}
    >
      {columns.map((it, index) => {
        const isActive = targets.includes(index);

        return (
          <div
            key={index}
            data-index={index}
            className={classNames("relative bg-black/40", "w-16 h-16")}
            onClick={() => handleClick(index)}
          >
            {isActive ? (
              <div
                className={classNames(
                  "absolute left-2 right-2 top-2 bottom-2",
                  "bg-highlight"
                )}
              ></div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
