import { EDirectionType, ETextAlign } from '@front-end/core';
import { ReactNode } from 'react';
import { styledComponent } from '../../styled/styled';
import { default as CustomDivider } from './divider';
import { DividerProps as DividerPropsAnt } from 'antd';

export interface DividerProps extends DividerPropsAnt {
  dashed?: boolean;
  orientation?: ETextAlign;
  type?: EDirectionType;
  children?: ReactNode;
}

export const StyledDivider = styledComponent(CustomDivider)`
  border-width: 2px 0 0;
`;

export function Divider({
  dashed = false,
  orientation = ETextAlign.Left,
  type = EDirectionType.Horizontal,
  children,
  className,
  orientationMargin,
}: DividerProps) {
  const passProps = { dashed, orientation, type, className, orientationMargin };

  return <StyledDivider {...passProps}>{children}</StyledDivider>;
}

export default Divider;
