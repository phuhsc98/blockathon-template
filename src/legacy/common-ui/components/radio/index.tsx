import { IHtmlAttributes } from '@front-end/core';
import { ReactNode } from 'react';
import { styledComponent } from '../../styled/styled';
import { default as CustomRadio } from './radio';

export interface RadioProps extends IHtmlAttributes {
  autoFocus?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: any;
}

const StyledRadio = styledComponent(CustomRadio)``;

export function Radio({
  autoFocus = false,
  checked = false,
  defaultChecked = false,
  disabled = false,
  value,
  children,
  'data-testid': dataTestId,
  className,
}: RadioProps) {
  const passProps = {
    autoFocus,
    checked,
    defaultChecked,
    disabled,
    value,
    'data-testid': dataTestId,
    className,
  };
  return <StyledRadio {...passProps}>{children}</StyledRadio>;
}

export default Radio;
