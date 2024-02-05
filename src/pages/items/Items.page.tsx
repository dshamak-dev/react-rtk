import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selector as userSelector,
  actions,
} from "src/namespaces/user/user.store";
import { Scene } from "src/components/molecules/Scene";
import { ItemPreview } from "src/namespaces/item/components/ItemPreview";
import { getUser } from "src/namespaces/user/user.api";
import classNames from "classnames";

export default function ItemsPage() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const items = useMemo(() => {
    return user?.items || [];
  }, [user?.items]);

  const inventoryContent = useMemo(() => {
    return (
      <div
        className={classNames(
          "flex gap-4 flex-wrap justify-center",
          "max-w-full p-4 bg-black/20 p-8"
        )}
      >
        {items.map((it, index) => {
          return <ItemPreview key={index} item={it} />;
        })}
      </div>
    );
  }, [items]);

  const handleSync = async () => {
    const user = await getUser();

    dispatch(actions.set(user));
  };

  useEffect(() => {
    handleSync();
  }, []);

  return (
    <Scene name="items">
      <div className="h-full flex items-center justify-center">
        {inventoryContent}
      </div>
    </Scene>
  );
}
