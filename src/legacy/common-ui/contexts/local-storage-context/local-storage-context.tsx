import React, {
  useState,
  useMemo,
  useCallback,
  ReactNode,
  createContext,
} from 'react';
import { ILocalStorage, ILocalStorageContext } from '@front-end/core';

export const initialValue: ILocalStorage = {
  token: '',
};

export const initialContext: ILocalStorageContext = {
  localStorage: initialValue,
  setLocalStorage: () => undefined,
};

export const LocalStorageContexts =
  createContext<ILocalStorageContext>(initialContext);

interface Props {
  children?: ReactNode;
}

export const LocalStorageContextProvider = ({ children }: Props) => {
  const [state, setState] = useState<ILocalStorage>(() =>
    Object.keys(initialValue).reduce(
      (acc: { [key: string]: string }, cur: string) => {
        acc[cur] = window.localStorage.getItem(cur) || '';
        return acc;
      },
      {}
    )
  );

  const setLocalStorage = useCallback((key: string, value: string) => {
    setState((preState) => ({ ...preState, [key]: value }));
    localStorage.setItem(key, value);
  }, []);

  const valueMemo = useMemo(
    () => ({ localStorage: state, setLocalStorage }),
    [setLocalStorage, state]
  );

  return (
    <LocalStorageContexts.Provider value={valueMemo}>
      {children}
    </LocalStorageContexts.Provider>
  );
};
