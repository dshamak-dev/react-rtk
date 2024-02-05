"use client";

import React, { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { getApp } from "src/app/app.api";
import { getUser } from "src/namespaces/user/user.api";
import { AppStoreType, makeStore } from "src/store/root.store";

const StoreListener = () => {
  return null;
};

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store, setStore] = useState<AppStoreType>(null);

  const handleLoad = async () => {
    const appState = await getApp();
    const userState = await getUser();

    setStore(makeStore({ app: appState, user: userState }));
  };

  useEffect(() => {
    handleLoad();
  }, []);

  if (!store) {
    return null;
  }

  return (
    <Provider store={store}>
      <StoreListener />
      {children}
    </Provider>
  );
}
