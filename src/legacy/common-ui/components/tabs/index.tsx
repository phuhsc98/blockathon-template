import { noarr } from '@front-end/core';
import { ReactNode } from 'react';
import { styledComponent } from '../../styled/styled';
import { default as CustomTabs } from './tabs';
import { TabsProps as TabsPropAnt } from 'antd';

export interface TabItemProps {
  closeIcon?: ReactNode;
  disabled?: boolean;
  forceRender?: boolean;
  key: string;
  label: ReactNode;
  children?: ReactNode;
}

export interface TabsProps extends TabsPropAnt {
  defaultActiveKey?: string;
  items: TabItemProps[];
  onTabClick?: (
    activeKey: string,
    e: React.KeyboardEvent | React.MouseEvent
  ) => void;
  onChange?: (activeKey: string) => void;
}

export const StyledTabs = styledComponent(CustomTabs)``;

export function Tabs({
  defaultActiveKey,
  items = noarr,
  onTabClick,
  onChange,
  ...rest
}: TabsProps) {
  const passProps = { defaultActiveKey, items, onTabClick, onChange };

  return <StyledTabs {...passProps} {...rest} />;
}

export default Tabs;
