import {
  EFormItemStatus,
  EInputSize,
  IHtmlAttributes,
  noop,
} from '@front-end/core';
import { ReactNode } from 'react';
import { styledComponent } from '../../styled/styled';
import { default as CustomInputPassword } from './input-password';

export interface InputPasswordProps extends IHtmlAttributes {
  name?: string;
  onChange?: () => undefined;
  placeholder?: string;
  prefix?: ReactNode;
  status?: EFormItemStatus;
  value?: any;
  size?: EInputSize;
  maxLength?: number;
}

const StyledInputPassword = styledComponent(CustomInputPassword)``;

export function InputPassword({
  name,
  onChange = noop,
  placeholder,
  prefix,
  status,
  value,
  size = EInputSize.Large,
  maxLength,
  className = '',
  'data-testid': dataTestId,
}: InputPasswordProps) {
  const passProps = {
    autoFocus: true,
    key: name,
    name,
    onChange,
    placeholder,
    prefix,
    status,
    value,
    size,
    maxLength,
    className,
  };

  return <StyledInputPassword {...passProps} data-testid={dataTestId} />;
}

export default InputPassword;
