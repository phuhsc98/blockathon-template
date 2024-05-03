import { useTheme } from '@front-end/hooks';
import React, { ReactNode } from 'react';
import { default as Icon } from './icons';

export interface IconComponentProps {
  color?: string;
  component?: ReactNode | unknown;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export function Icons({ component, color: parentColor, size = 16, className, onClick }: IconComponentProps) {
  const theme = useTheme();
  const color = parentColor || '' + theme.colorPrimary;
  const passProps = {
    style: { color, fontSize: `${size}}px` },
    component: component as unknown as React.ForwardRefExoticComponent<unknown>,
    className,
    onClick,
  };

  return <Icon {...passProps} />;
}

export * from './icons';
export * from './custom';
export default Icons;
