import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { IItem } from "src/namespaces/item/item.model";
import { ItemIcon } from "src/components/atoms/ItemIcon";

interface Props extends PropsWithChildren<any> {
  item: IItem;
}

export const ItemPreview: React.FC<Props> = ({ item, className, ...other }) => {
  return (
    <div
      {...other}
      className={classNames(
        className,
        "relative w-16 h-16 flex items-center justify-center",
        'bg-black/50 text-white'
      )}
    >
      <ItemIcon type={item.type} />
      <div className="absolute bottom-0 right-0 text-xs p-1">
        {item.quantity ? <span>{item.quantity}</span> : null}
      </div>
    </div>
  );
};
