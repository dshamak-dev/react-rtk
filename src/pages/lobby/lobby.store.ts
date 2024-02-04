import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const STORE_NAME = "lobby";
export type ShopStateType = typeof initialState;

export const slice = createSlice({
  name: STORE_NAME,
  initialState: initialState,
  reducers: {
    set: (state, { payload }) => {
      Object.assign(state, payload);
    },
  },
});

export const reducer = slice.reducer;

export const actions = slice.actions;

export const selector = (state) => {
  const store = state[STORE_NAME];

  if (!store) {
    return initialState;
  }

  return store;
};

