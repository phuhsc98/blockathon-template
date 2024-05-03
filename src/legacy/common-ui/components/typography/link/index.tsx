import { ReactNode } from 'react';
import { default as CustomLink } from './link';
import { styledComponent } from '../../../styled/styled';
import { noop } from '@front-end/core';

export interface LinkProps {
  href?: string;
  target?: string;
  onClick?(): void;
  children?: ReactNode;
}

const StyledLink = styledComponent(CustomLink)``;

export function Link({
  href = '',
  target = '_blank',
  onClick = noop,
  children,
}: LinkProps) {
  const passProps = { href, target };

  return <StyledLink {...passProps}>{children || 'Link'}</StyledLink>;
}

export default Link;
