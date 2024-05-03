import { EMenuType } from '@front-end/core';
import { Key, ReactNode } from 'react';

export interface ISubmenuItem extends IMenuItem {
  type?: EMenuType;
  permissionKey?: string | string[];
}

export interface IMenuItem {
  children?: ISubmenuItem[];
  disabled?: boolean;
  icon?: ReactNode;
  key: Key;
  label?: ReactNode;
  title?: string;
  type?: EMenuType;
  permissionKey?: string | string[];
}

export interface IMenuInfo {
  key: string;
  keyPath: string[];
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}
