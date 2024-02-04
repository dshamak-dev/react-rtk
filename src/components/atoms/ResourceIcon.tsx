import { faBolt, faCoins, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { ResourceType } from "src/models/resource.model";

interface Props {
  type: ResourceType;
}

export const ResourceIcon: React.FC<Props> = ({ type }) => {
  const icon = useMemo(() => {
    switch (type) {
      case "coin": {
        return faCoins;
      }
      case 'energy': {
        return faBolt;
      }
      default: {
        return faStar;
      }
    }
  }, [type]);

  return <FontAwesomeIcon icon={icon} />;
};
