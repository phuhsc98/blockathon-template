import { ReactNode } from 'react';
import { styledComponent } from '../../../styled/styled';
import { default as CustomCol } from './col';

export interface ColProps {
  flex?: string | number;
  hidden?: boolean;
  lg?: number | object;
  md?: number | object;
  offset?: number;
  sm?: number | object;
  span?: number;
  xl?: number | object;
  xs?: number | object;
  xxl?: number | object;
  children?: ReactNode;
  className?: string;
}

const StyledCol = styledComponent(CustomCol)`
`;

export function Col({ flex, hidden, offset = 0, span = 0, xs, sm, md, lg, xl, xxl, children, className }: ColProps) {
  const passProps = { flex, offset, span, xs, sm, md, lg, xl, xxl, containerClass: className };

  return hidden ? null : <StyledCol {...passProps}>{children}</StyledCol>;
}

export default Col;
