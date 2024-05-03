import { InputNumberProps as AntdInputNumberProps } from 'antd';
import { styledComponent } from '../../styled/styled';

import { default as CustomInputNumber } from './input-number';
import { FocusEventHandler } from 'react';

const StyledInputNumber = styledComponent(CustomInputNumber)``;

interface InputNumberProps
  extends Pick<
    AntdInputNumberProps,
    'className' | 'min' | 'max' | 'onBlur' | 'onPressEnter' | 'name' | 'onChange' | 'value' | 'parser' | 'onKeyUp' | 'type' | 'disabled'
  > {
  inputNumberRef?: React.Ref<HTMLInputElement> | undefined;
  inputNumberOnBlur?: FocusEventHandler<any> | undefined;
}

export function InputNumberAntd({ inputNumberRef, inputNumberOnBlur, ...props }: InputNumberProps) {
  return (
    <StyledInputNumber
      style={{ width: '100%' }}
      ref={inputNumberRef}
      {...props}
    />
  );
}

export default InputNumberAntd;
