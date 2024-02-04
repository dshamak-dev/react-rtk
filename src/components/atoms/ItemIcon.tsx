import { faCoins, faStar, faWineBottle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";

interface Props {
  type: string;
}

export const ItemIcon: React.FC<Props> = ({ type }) => {
  const icon = useMemo(() => {
    switch (type) {
      case "potion": {
        return faWineBottle;
      }
      default: {
        return faStar;
      }
    }
  }, [type]);

  return <FontAwesomeIcon icon={icon} />;
};
