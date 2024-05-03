import { ReactNode } from 'react';

import { EBreakpoint, noop } from '@front-end/core';

import { styledComponent } from '../../../styled/styled';

import { default as CustomSider } from './sider';

export interface SiderProps {
  breakpoint?: EBreakpoint;
  className?: string;
  collapsed?: boolean;
  collapsible?: boolean;
  containerClass?: string;
  onBreakpoint?(): undefined;
  onCollapse?(collapsed: boolean): void;
  trigger?: ReactNode;
  width?: number;
  children?: ReactNode;
}

const StyledSider = styledComponent(CustomSider)`
  position: relative;
`;

export function Sider({
  breakpoint,
  className = '',
  collapsed = false,
  collapsible = false,
  containerClass = '',
  onBreakpoint = noop,
  onCollapse = noop,
  trigger,
  width = 200,
  children,
}: SiderProps) {
  const passProps = {
    breakpoint,
    className,
    collapsed,
    collapsible,
    containerClass,
    onBreakpoint,
    onCollapse,
    trigger,
    width,
  };

  return <StyledSider {...passProps}>{children || 'Sider'}</StyledSider>;
}

export default Sider;
