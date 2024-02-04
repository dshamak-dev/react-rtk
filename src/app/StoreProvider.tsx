"use client";

import React, { useEffect, useRef } from "react";
import { Provider} from "react-redux";
import { AppStoreType, makeStore } from "src/store/root.store";

const StoreListener = () => {
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
