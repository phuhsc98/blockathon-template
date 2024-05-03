import { ReactNode } from 'react';

import { styledComponent } from '../../../styled/styled';

import { default as CustomHeader } from './header';

export interface HeaderProps {
  children?: ReactNode;
  className?: string;
  containerClass?: string;
}

const StyledHeader = styledComponent(CustomHeader)`
  box-shadow: ${(props) => props?.theme?.boxShadowSecondary};
  background-color: ${(props) => props.theme?.colorBgLayout} !important;
`;

export function Header({ children, className, containerClass }: HeaderProps) {
  const passProps = { className, containerClass };

  return <StyledHeader {...passProps}> {children || 'Header'}</StyledHeader>;
}

export default Header;
