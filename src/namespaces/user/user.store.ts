import { createSlice } from "@reduxjs/toolkit";
import { appendItems, removeItem } from "src/namespaces/item/item.control";
import { copyObject } from "src/support/object.support";

const initialState = {
  experience: 0,
  items: [],
  coins: 0,
  energy: 0,
  resources: [],
};

export const STORE_NAME = "user";
export type StateType = typeof initialState;

export const storeSlice = createSlice({
  name: STORE_NAME,
  initialState: initialState,
  reducers: {
    set: (state, { payload }) => {
      return Object.assign(state, payload);
    },
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
      state.items = removeItem(state.items, payload);
    },
    addUserItems: (state, { payload }) => {
      state.items = appendItems(state.items, payload);
    },
    addResources: (state, { payload }) => {
      if (!payload?.length) {
        return state;
      }

      const storeResources = copyObject(state.resources) || [];

      const resources = payload.reduce(
        (prev, item) => {
          let next = prev.slice();
          let index = next.findIndex((it) => it.type === item.type);
          let res =
            index === -1
              ? {
                  type: item.type,
                  value: 0,
                }
              : prev[index];

          res.value += item.value;

          if (index === -1) {
            next.push(res);
          }

          return next;
        },
        storeResources
      );

      state.resources = resources;
    },
    removeResources: (state, { payload }) => {
      if (!payload?.length) {
        return state;
      }

      let priceResources = copyObject(payload);
      const resources = copyObject(state.resources) || [];
      const resourcesMap = resources.reduce((prev, it) => {
        return { ...prev, [it.type]: it };
      }, {});
      
      priceResources.forEach((it) => {
        let res = resourcesMap[it.type];

        if (res) {
          res.value -= it.value;
        }
      });

      state.resources = resources;
    }
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

export const userCoinsSelector = (state) => {
  const store = state[STORE_NAME];

  const resources = store?.resources || [];
  const coins = resources?.find((it) => it.type === "coins")?.value || 0;

  return coins;
};

export const userResourcesSelector = (state) => {
  const store = state[STORE_NAME];

  return store?.resources || [];
};
