import { createSlice } from "@reduxjs/toolkit";
import { Enemy } from "src/entities/enemy/enemy.model";

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

  localStorage.setItem(SHOP_STORE_NAME, JSON.stringify(state));
};

export const shopSlice = createSlice({
  name: SHOP_STORE_NAME,
  initialState: loadState() || initialState,
  reducers: {},
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
