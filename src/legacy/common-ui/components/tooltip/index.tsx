import { ReactNode } from 'react';

import { styledComponent } from '../../styled/styled';
import { default as CustomTooltip } from './tooltip';

export interface TooltipProps {
  title?: ReactNode | (() => ReactNode);
  children?: ReactNode;
}

const StyledTooltip = styledComponent(CustomTooltip)``;

export function Tooltip({ title, children }: TooltipProps) {
  const passProps = { title };

  return <StyledTooltip {...passProps}>{children}</StyledTooltip>;
}

export default Tooltip;
