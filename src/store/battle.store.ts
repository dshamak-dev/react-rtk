import { createSlice } from "@reduxjs/toolkit";
import { Enemy } from "src/entities/enemy/enemy.model";

const initialState = {
  enemy: null,
};

export const STORE_NAME = "battle";
export type BattleStateType = typeof initialState;

export const loadState = (): BattleStateType => {
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

export const battleSlice = createSlice({
  name: STORE_NAME,
  initialState: loadState() || initialState,
  reducers: {
    setEnemy: (state, { type, payload }) => {
      state.enemy = payload;

      return state;
    },
    hitEnemy: (state, { type, payload }) => {
      if (!state.enemy) {
        return state;
      }

      const value = Number(payload) || 0;

      let health = state.enemy?.health || 0;

      health -= value;

      return { ...state, enemy: { ...state.enemy, health } };
    },
    removeEnemyItems: (state, { payload = [] }) => {
      if (!state.enemy || !payload) {
        return state;
      }

      const types = payload.map((it) => it.type);
      const enemy = Object.assign({}, state.enemy);
      const items = (enemy.items?.slice() || []).filter(({ type }) => {
        return !types.includes(type);
      });

      state.enemy = Object.assign(enemy, { items });
    },
    removeEnemy: (state) => {
      state.enemy = null;
    },
  },
});

export const battleReducer = battleSlice.reducer;

export const battleActions = battleSlice.actions;

export const battleSelector = (state) => {
  const store = state[STORE_NAME];

  if (!store) {
    return initialState;
  }

  return store;
};
