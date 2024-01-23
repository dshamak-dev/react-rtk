"use client";

import React, { useEffect, useRef } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { validateEnemyHealth } from "src/entities/enemy/enemy.model";
import {
  selector as userSelector,
  StateType as UserStateType,
  saveState as saveUserState,
  actions as userActions,
} from "src/store/user.store";
import {
  selector as appSelector,
  StateType as AppStateType,
  saveState as saveAppState,
  actions as appActions,
} from "src/store/app.store";
import {
  BattleStateType,
  battleSelector,
  saveState as saveBattleState,
} from "src/store/battle.store";
import { AppStoreType, makeStore } from "src/store/root.store";
import {
  shopSelector,
  saveState as saveShopState,
  ShopStateType,
} from "src/store/shop.store";

const StoreListener = () => {
  const appState: AppStateType = useSelector(appSelector);
  const userState: UserStateType = useSelector(userSelector);
  const shopState: ShopStateType = useSelector(shopSelector);
  const battleState: BattleStateType = useSelector(battleSelector);

  useEffect(() => {
    saveAppState(appState);
  }, [JSON.stringify(appState)]);

  useEffect(() => {
    saveUserState(userState);
  }, [JSON.stringify(userState)]);

  useEffect(() => {
    saveShopState(shopState);
  }, [JSON.stringify(shopState)]);

  useEffect(() => {
    saveBattleState(battleState);
  }, [JSON.stringify(battleState)]);

  return null;
};

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStoreType>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <StoreListener />
      {children}
    </Provider>
  );
}
