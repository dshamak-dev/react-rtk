import React from "react";
import StoreProvider from "src/app/StoreProvider";
import { AppRouter } from "src/app/AppRouter";

export const App = () => {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
};
