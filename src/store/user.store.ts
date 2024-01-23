import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  experience: 0,
  items: [],
  coins: 0,
};

export const STORE_NAME = "user";
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

export const storeSlice = createSlice({
  name: STORE_NAME,
  initialState: loadState() || initialState,
  reducers: {
    resetState: (state, { payload }) => {
      const data = JSON.parse(payload);

      return { ...state, ...data };
    },
    addExperience: (state, { type, payload }) => {
      state.experience += Number(payload) || 0;

      return state;
    },
    addCoins: (state, { type, payload }) => {
      state.coins += Number(payload) || 0;
    },
    addItem: (state, { payload }) => {
      const items = state.items || [];

      items.push(payload);

      state.items = items;
    },
    removeItem: (state, { payload }) => {
      const items = (state.items || []).filter((it) => {
        return it.id !== payload?.id;
      });

      state.items = items;
    },
    addUserItems: (state, { payload }) => {
      if (!payload?.length) {
        return state;
      }

      const prevItems = state.items || [];
      const entries = prevItems.reduce((prev, it) => {
        const { type } = it;

        return { ...prev, [type]: Object.assign({}, it) };
      }, {});

      payload
        .filter((it) => !!it && it.number)
        .forEach((it) => {
          const { type, number } = it;

          const item = entries[type] || { type, number: 0 };

          item.number += number;

          entries[type] = item;
        });

      state.items = Object.values(entries);
    },
  },
});

export const reducer = storeSlice.reducer;

export const actions = storeSlice.actions;

export const selector = (state) => {
  const store = state[STORE_NAME];

  if (!store) {
    return initialState;
  }

  return store;
};
