import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as userReducer } from "src/namespaces/user/user.store";
import { reducer as appReducer } from "src/app/app.store";
import { shopReducer } from "src/store/shop.store";
import { battleReducer } from "src/store/battle.store";
import { reducer as lobbyReducer } from "src/pages/lobby/lobby.store";

export const makeStore = (preloadedState = null) => {
  return configureStore({
    preloadedState: Object.assign(
      {
        app: { pathname: "items" },
      },
      preloadedState
    ),
    reducer: combineReducers({
      app: appReducer,
      user: userReducer,
      shop: shopReducer,
      battle: battleReducer,
      lobby: lobbyReducer,
    }),
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });
};

export type AppStoreType = ReturnType<typeof makeStore>;
