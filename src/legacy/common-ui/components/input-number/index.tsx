import { ChangeEventHandler, ReactNode } from 'react';

import { EInputSize, IHtmlAttributes, noop } from '@front-end/core';

import { styledComponent } from '../../styled/styled';

import { default as CustomInputNumber } from './input-number';

export interface InputNumberProps extends IHtmlAttributes {
  name?: string;
  onChange?: () => undefined;
  placeholder?: string;
  prefix?: ReactNode;
  value?: number;
  size?: EInputSize;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  disabled?: boolean;
}

const StyledInputNumber = styledComponent(CustomInputNumber)``;

export function InputNumber({
  name,
  onChange = noop,
  placeholder,
  prefix,
  value,
  size = EInputSize.Large,
  className = '',
  addonBefore,
  addonAfter,
  disabled,
  'data-testid': dataTestId,
}: InputNumberProps) {
  const passProps = {
    autoFocus: true,
    key: name,
    name,
    onChange,
    placeholder,
    prefix,
    value,
    size,
    className,
    addonBefore,
    addonAfter,
    disabled,
  };

  return (
    <StyledInputNumber
      style={{ width: '100%' }}
      {...passProps}
      data-testid={dataTestId}
    />
  );
}

export default InputNumber;
