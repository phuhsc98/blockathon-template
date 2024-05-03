import create from 'zustand';
import { persist } from 'zustand/middleware';
import { createPhoneCodeSlice, createTokenSlice } from './create-token-slice';
import shallow from 'zustand/shallow';

export function createStore(slices: any[]) {
  const useStore = create((...a) => slices.reduce((acc: any, cur: any) => ({ ...acc, ...cur(...a) }), {}));
  return [(selector: any) => useStore(selector, shallow) as any, useStore];
}

export function createStorePersist(slices: any[]) {
  const useStorePersist = create(
    persist(
      (...a) =>
        slices.reduce((acc: any, cur: any) => ({ ...acc, ...cur(...a) }), {
          ...createTokenSlice(...a),
          ...createPhoneCodeSlice(...a),
        }),
      {
        name: 'persist',
      }
    )
  );
  return [(selector: any) => useStorePersist(selector, shallow) as any, useStorePersist as any];
}

export const useStoreToken = create(
  persist(createTokenSlice, {
    name: 'token',
  })
) as any;

export const [useStorePersistBase, useStorePersistBaseRaw] = createStorePersist([]);
