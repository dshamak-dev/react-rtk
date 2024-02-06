import { faAward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IResource } from "src/models/resource.model";
import { ResourceList } from "src/namespaces/resource/components/ResourceList";

interface Props {
  resources: IResource[];
}

export const AwardPreview: React.FC<Props> = ({ resources }) => {
  return (
    <div className="flex gap-2 px-2 py-1 bg-white/80 text-xs text-black rounded-xl items-center">
      <span className="capitalize">
        <FontAwesomeIcon icon={faAward} />
      </span>
      <ResourceList items={resources} />
    </div>
  );
};
