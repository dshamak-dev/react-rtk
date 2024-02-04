import React, { useMemo } from "react";
import { RaidPreview } from "src/components/molecules/RaidPreview";
import { IRaid } from "src/models/raid.model";

interface Props {
  items: IRaid[];
}

export const RaidList: React.FC<Props> = ({ items }) => {
  const content = useMemo(() => {
    return (
      <div className="flex flex-col">
        {items.map((raid, index) => {
          return <RaidPreview key={raid.id || index} raid={raid} />;
        })}
      </div>
    );
  }, [items]);

  return <div>{content}</div>;
};
