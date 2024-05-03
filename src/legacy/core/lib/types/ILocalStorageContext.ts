import { ILocalStorage } from './ILocalStorage';

export interface ILocalStorageContext {
  localStorage: ILocalStorage;
  setLocalStorage: (key: string, value: string) => void;
}
