import { faBolt, faCoins, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { ResourceType } from "src/models/resource.model";
import { userResourcesSelector } from "src/namespaces/user/user.store";

interface Props {
  type: ResourceType;
}

export const ResourceValue: React.FC<Props> = ({ type }) => {
  const resources = useSelector(userResourcesSelector);

  const value = useMemo(() => {
    return resources.find((it) => it.type === type)?.value || 0;
  }, [resources]);

  return <span>{value}</span>;
};
