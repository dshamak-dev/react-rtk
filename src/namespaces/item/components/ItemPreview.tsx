import React, { PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { IItem } from "src/namespaces/item/item.model";
import { ItemIcon } from "src/components/atoms/ItemIcon";

interface Props extends PropsWithChildren<any> {
  item: IItem;
}

export const ItemPreview: React.FC<Props> = ({ item, className, ...other }) => {
  return (
    <div {...other} className={classNames(className, "relative")}>
      <ItemIcon type={item.type} />
      {item.quantity ? <span>{item.quantity}</span> : null}
    </div>
  );
};
