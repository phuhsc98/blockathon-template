import { ReactNode } from 'react';

import { ButtonProps as AntButtonProps } from 'antd/es/button';

import {
  EButtonSize,
  EButtonType,
  IHtmlAttributes,
  noop,
} from '@front-end/core';

import { styledComponent } from '../../styled/styled';

import { default as CustomButton } from './button';

export interface ButtonProps
  extends IHtmlAttributes,
    Pick<AntButtonProps, 'onClick' | 'shape'> {
  block?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  htmlType?: 'button' | 'submit';
  icon?: ReactNode;
  loading?: boolean;
  type?: EButtonType;
  size?: EButtonSize;
  danger?: boolean;
}

const StyledButton = styledComponent(CustomButton)``;

export function Button({
  block = false,
  disabled = false,
  ghost = false,
  htmlType = 'button',
  icon,
  loading = false,
  size = EButtonSize.Large,
  onClick = noop,
  type = EButtonType.Primary,
  'data-testid': dataTestId,
  children,
  className = '',
  danger = false,
  shape,
}: ButtonProps) {
  const passProps = {
    htmlType,
    block,
    disabled,
    type,
    icon,
    loading,
    size,
    ghost,
    onClick,
    className,
    danger,
    shape,
  };

  return (
    <StyledButton {...passProps} data-testid={dataTestId}>
      {children}
    </StyledButton>
  );
}
export default Button;
