import { IHtmlAttributes } from '@front-end/core';
import { styledComponent } from '../../../styled/styled';
import { default as CustomFooter } from './footer';

export interface FooterProps extends IHtmlAttributes {}

const StyledFooter = styledComponent(CustomFooter)``;

export function Footer({ className = '', children }: FooterProps) {
  return (
    <StyledFooter className={className}>{children || 'Footer'}</StyledFooter>
  );
}

export default Footer;
