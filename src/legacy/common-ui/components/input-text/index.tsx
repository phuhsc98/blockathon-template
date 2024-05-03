import { ChangeEventHandler, ReactNode } from 'react';

import {
  EFormItemStatus,
  EInputSize,
  ETextAlign,
  IHtmlAttributes,
  noop,
} from '@front-end/core';

import { styledComponent } from '../../styled/styled';
import { default as CustomInputText } from './input-text';
import { InputProps } from 'antd';

export interface InputTextProps
  extends IHtmlAttributes,
    Omit<InputProps, 'placeholder'> {
  addonAfter?: ReactNode;
  addonBefore?: ReactNode;
  disabled?: boolean;
  maxLength?: number;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  prefix?: ReactNode;
  size?: EInputSize;
  status?: EFormItemStatus;
  textAlign?: ETextAlign;
  value?: string | number | string[];
  suffix?: ReactNode;
  placeholder?: string | null;
}

export const StyledInputText = styledComponent(CustomInputText)``;

export const InputText = ({
  'data-testid': dataTestId,
  addonAfter,
  addonBefore,
  className = '',
  disabled = false,
  maxLength,

  name,
  onChange = noop,
  placeholder,
  prefix,
  size = EInputSize.Large,
  status,
  textAlign = ETextAlign.Left,
  value,
  suffix,
  type,
}: InputTextProps) => {
  const passProps = {
    'data-testid': dataTestId,
    addonAfter,
    addonBefore,
    autoFocus: true,
    className,
    disabled,
    key: name,
    maxLength,
    name,
    onChange,
    placeholder: placeholder ?? '',
    prefix,
    size,
    status,
    textAlign,
    value,
    type,
    suffix,
  };

  return <StyledInputText style={{ textAlign }} {...passProps} />;
};

export default InputText;
