import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as userReducer } from "src/namespaces/user/user.store";
import { reducer as appReducer } from "src/store/app.store";
import { shopReducer } from "src/store/shop.store";
import { battleReducer } from "src/store/battle.store";
import { reducer as lobbyReducer } from "src/pages/lobby/lobby.store";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      user: userReducer,
      shop: shopReducer,
      battle: battleReducer,
      lobby: lobbyReducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });
};

export type AppStoreType = ReturnType<typeof makeStore>;
