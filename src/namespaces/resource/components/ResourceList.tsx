import React from "react";
import { ResourceIcon } from "src/components/atoms/ResourceIcon";
import { IResource } from "src/models/resource.model";

interface Props {
  items: IResource[];
}

export const ResourceList: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items.map((it) => (
        <div key={it.type} className="flex gap-1 items-center">
          <span>{it.value}</span>
          <ResourceIcon type={it.type} />
        </div>
      ))}
    </>
  );
};
