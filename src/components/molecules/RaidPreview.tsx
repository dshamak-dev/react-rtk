import classNames from "classnames";
import React, { useMemo } from "react";
import { ResourceIcon } from "src/components/atoms/ResourceIcon";
import { ResourceValue } from "src/components/atoms/ResourceValue";
import { IRaid } from "src/models/raid.model";

interface Props {
  raid: IRaid;
}

export const RaidPreview: React.FC<Props> = ({ raid }) => {
  if (!raid) {
    return null;
  }
  const { id, type, name, startDate, endDate, resources, levels } = raid;

  return (
    <div
      className={classNames(
        "relative flex flex-col bg-black/20 p-4 pt-32 z-0 border-2 border-black/20",
        "opacity-50 hover:opacity-100"
      )}
    >
      <div className="absolute left-0 top-0 w-full h-full z-0 opacity-40"></div>
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="text-center">
          <h4 data-id={id} className="text-xs">
            {type}
          </h4>
          <p className="text-xs">
            {startDate} - {endDate}
          </p>
        </div>
        <h2 data-id={id} className="uppercase text-2xl">
          {name}
        </h2>
        {resources ? (
          <div className="flex gap-4 px-2 py-1 bg-white/80 text-black rounded-md items-center">
            {resources.map((it) => (
              <div key={it.type} className="flex gap-1 items-center">
                <span>{it.value}</span>
                <ResourceIcon type={it.type} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
