import { createSlice } from "@reduxjs/toolkit";
import { AppRouteType } from "src/app/AppRouter";

const initialState = {
  pathname: null,
};

export const STORE_NAME = "app";
export type StateType = typeof initialState;

export const loadState = (): StateType => {
  try {
    const record = localStorage.getItem(STORE_NAME);

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
    return localStorage.removeItem(STORE_NAME);
  }

  localStorage.setItem(STORE_NAME, JSON.stringify(state));
};

export const slice = createSlice({
  name: STORE_NAME,
  initialState: loadState() || initialState,
  reducers: {
    navigateTo: (state, { payload }) => {

      if (payload) {
        state.pathname = payload;
      }
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
