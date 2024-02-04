import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { useMemo } from "react";
import { ItemIcons } from "src/namespaces/item/item.prefabs";

export const ItemCard = ({ number, quality, type, ...other }) => {
  const icon = useMemo(() => ItemIcons[type] || null, [type]);

  return (
    <div
      {...other}
      data-number={number}
      title={`${type} (${number})`}
      className={classNames(
        quality,
        "relative text-xl w-16 h-16 border",
        "flex items-center justify-center"
      )}
    >
      {icon ? <FontAwesomeIcon icon={icon} /> : <div>{type}</div>}
      <label className="absolute right-0 bottom-0 bg-white/50 text-black text-xs p-1">
        {number}
      </label>
    </div>
  );
};
