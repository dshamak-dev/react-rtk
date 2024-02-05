import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shopActions, shopSelector } from "src/store/shop.store";
import {
  actions as userActions,
  userCoinsSelector,
  selector as userSelector,
} from "src/namespaces/user/user.store";
import { Scene } from "src/components/molecules/Scene";
import { getShopItems } from "src/pages/shop/shop.api";
import { ShopListItem } from "src/components/molecules/ShopListItem";
import { ResourceIcon } from "src/components/atoms/ResourceIcon";
import { Button } from "src/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { ClaimResourcesButton } from "src/components/molecules/ClaimResourcesButton";
import { shopAdResources } from "src/pages/shop/shop.model";
import { UserResourceValue } from "src/components/atoms/UserResourceValue";

export default function Shop() {
  const dispatch = useDispatch();
  const [showSell, setShowSell] = useState(false);
  const shop = useSelector(shopSelector);
  const userCoins = useSelector(userCoinsSelector);

  const handleSellItem = () => {
    // dispatch();
  };

  const handleRefreshShop = async () => {
    const shopItems = await getShopItems();

    dispatch(shopActions.set({ items: shopItems }));
  };

  useEffect(() => {
    handleRefreshShop();
  }, []);

  const content = useMemo(() => {
    const list = shop.items;

    if (!list?.length) {
      return (
        <div className="flex h-full items-center text-center">
          <h3>Come back in 15 minutes.</h3>
        </div>
      );
    }

    return (
      <div className="relative flex flex-col">
        <div className="flex w-full justify-end">
          <div className="flex gap-2 px-4 py-2 bg-white text-black items-center">
            <ResourceIcon type="coin" />
            <UserResourceValue type="coin" />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4 border bg-white text-black">
          <div>
            <ClaimResourcesButton
              resources={shopAdResources}
              className="w-full flex items-center justify-center gap-1"
            >
              <div className="px-3 py-1 text-white bg-black rounded">
                <FontAwesomeIcon icon={faVideo} />
              </div>
              <span>=</span>
              <div className="flex gap-2 px-3 py-1 text-black bg-white rounded-md">
                {shopAdResources.map((it, index) => {
                  return (
                    <Fragment key={index}>
                      {index !== 0 ? <span>+</span> : null}
                      <span className="flex items-center gap-1">
                        <span>{it.value}</span>
                        <ResourceIcon type={it.type} />
                      </span>
                    </Fragment>
                  );
                })}
              </div>
            </ClaimResourcesButton>
          </div>
          {list.map((it, index) => {
            return <ShopListItem key={index} item={it} />;
          })}
        </div>
      </div>
    );
  }, [shop?.items]);

  return (
    <Scene name="shop">
      <div className="flex items-center justify-center h-full">{content}</div>
    </Scene>
  );
}
