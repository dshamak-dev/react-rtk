import { createSlice } from "@reduxjs/toolkit";
import { Enemy } from "src/namespaces/enemy/enemy.model";
import { removeShopItems } from "src/pages/shop/shop.support";
import { copyObject } from "src/support/object.support";

const initialState = {
  items: [],
};

export const SHOP_STORE_NAME = "shop";
export type ShopStateType = typeof initialState;

export const loadState = (): ShopStateType => {
  try {
    const record = localStorage.getItem(SHOP_STORE_NAME);

    if (!record) {
      return initialState;
    }

    return JSON.parse(record);
  } catch (err) {
    return null;
  }
};
export const saveState = (state) => {
  if (!state) {
    return localStorage.removeItem(SHOP_STORE_NAME);
  }

  // localStorage.setItem(SHOP_STORE_NAME, JSON.stringify(state));
};

export const shopSlice = createSlice({
  name: SHOP_STORE_NAME,
  initialState: loadState() || initialState,
  reducers: {
    set: (state, { payload }) => {
      Object.assign(state, payload);
    },
    removeItems: (state, { payload }) => {
      if (!payload?.length) {
        return state;
      }

      const items = copyObject(state.items) || [];
      state.items = removeShopItems(items, payload);
    },
  },
});

export const shopReducer = shopSlice.reducer;

export const shopActions = shopSlice.actions;

export const shopSelector = (state) => {
  const store = state[SHOP_STORE_NAME];

  if (!store) {
    return initialState;
  }

  return store;
};
