import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pathname: "camp",
};

export const STORE_NAME = "app";
export type StateType = typeof initialState;

export const slice = createSlice({
  name: STORE_NAME,
  initialState: null,
  reducers: {
    set: (state, { payload }) => {
      Object.assign({}, initialState, state, payload);
    },
    navigateTo: (state, { payload }) => {
      if (!state) {
        return state;
      }

      if (payload) {
        Object.assign(state, payload);
      }
    },
  },
});

export const reducer = slice.reducer;

export const actions = slice.actions;

export const selector = (state) => {
  const store = state[STORE_NAME];

  return store;
};
