import classNames from "classnames";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemIcon } from "src/components/atoms/ItemIcon";
import { Loader } from "src/components/atoms/Loader";
import { ResourceIcon } from "src/components/atoms/ResourceIcon";
import { claimShopItems } from "src/pages/shop/shop.api";
import { shopActions } from "src/store/shop.store";
import {
  actions as userActions,
  userResourcesSelector,
  selector as userSelector,
} from "src/namespaces/user/user.store";
import { deleteUserResources, postUserItems, postUserResources } from "src/namespaces/user/user.api";

export const ShopListItem = ({ item }) => {
  const dispatch = useDispatch();
  const userResources = useSelector(userResourcesSelector);
  const [isBusy, setBusy] = useState(false);

  const canBuy = useMemo(() => {
    if (isBusy) {
      return false;
    }

    if (!item.price) {
      return true;
    }

    if (!userResources || item.quantity <= 0) {
      return false;
    }

    return item.price.every((it) => {
      const userResource = userResources.find((res) => res.type === it.type);

      if (!userResource) {
        return false;
      }

      return it.value <= userResource.value;
    });
  }, [userResources, item.resources, isBusy]);

  const handleBuy = async (number = 1) => {
    if (!canBuy) {
      return;
    }

    let transaction = {
      ...item,
      quantity: number,
    };

    const updatedUser = await deleteUserResources(item.price);

    dispatch(userActions.set(updatedUser));
    setBusy(true);

    const { items, ok, error } = await claimShopItems([transaction])
      .then((res) => {
        return { items: res, ok: true, error: null };
      })
      .catch((error) => {
        return { items: [], ok: false, error };
      });

    setBusy(false);

    if (!ok) {
      const updatedUser = await postUserResources(item.price);

      dispatch(userActions.set(updatedUser));
    } else {
      const updatedUser = await postUserItems([transaction]);

      dispatch(userActions.set(updatedUser));
    }

    dispatch(shopActions.removeItems(items));
  };

  const buyControls = useMemo(() => {
    if (item.quantity <= 0) {
      return <div className="">sold out</div>;
    }

    const disabled = !canBuy && !isBusy;

    return (
      <div
        className={classNames("flex gap-2 px-4 py-2", {
          "bg-transparent text-red-500 cursor-default line-through": disabled,
          "border bg-amber-300 cursor-pointer": !disabled,
        })}
        onClick={() => handleBuy(1)}
      >
        {isBusy ? (
          <Loader />
        ) : (
          item.price.map(({ type, value }, index) => {
            return (
              <span key={index} className="flex gap-1 items-center">
                <ResourceIcon type={type} />
                <span className="text-xl">{value}</span>
              </span>
            );
          })
        )}
      </div>
    );
  }, [canBuy, item, handleBuy, isBusy]);

  return (
    <div
      data-id={item.id}
      className="flex items-center justify-between gap-4 pl-4 pr-2 py-2 border bg-black/20"
    >
      <div className="flex gap-4 items-center">
        <span className="text-xl">
          <ItemIcon type={item.type} />
        </span>
        <span className="flex gap-2 text-xl capitalize">
          <span>{item.title}</span>
          <span>({item.quantity || 0})</span>
        </span>
      </div>
      {buyControls}
    </div>
  );
};
