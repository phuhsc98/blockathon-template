import { CSSProperties } from 'react';

import { EMenuMode, noop } from '@front-end/core';

import { styledComponent } from '../../styled/styled';

import { default as MenuCustom } from './menu';
import { IMenuInfo, IMenuItem } from './types';

export interface MenuProps {
  onClick?(e: IMenuInfo): void;
  onSelect?({ item, key, keyPath, selectedKeys, domEvent }): void;
  onDeselect?({ item, key, keyPath, selectedKeys, domEvent }): void;
  /**
   * Menu item content
   */
  items?: IMenuItem[];
  /**
   * Type of menu
   * @default horizontal
   */
  mode?: EMenuMode;
  //   defaultOpenKeys?: string[];
  //   defaultSelectedKeys?: string[];
  className?: string;
  style?: CSSProperties;
  selectedKeys?: string[];
}

const StyledMenu = styledComponent(MenuCustom)``;

export function Menu({
  onClick = noop,
  onDeselect = noop,
  onSelect = noop,
  className = '',
  items,
  mode = EMenuMode.Horizontal,
  style,
  selectedKeys,
}: MenuProps) {
  const defaultStyle: CSSProperties = {
    height: 'auto',
    ...(style || {}),
  };
  const passProps = {
    onSelect,
    onDeselect,
    items,
    mode,
    className,
    style: defaultStyle,
    selectedKeys,
  };

  const handleClick = (e: IMenuInfo) => {
    onClick(e);
  };

  return <StyledMenu {...passProps} onClick={handleClick} />;
}
