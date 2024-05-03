import { EInputSize, IHtmlAttributes } from '@front-end/core';
import { styledComponent } from '../../styled/styled';

import { default as CustomInputSearch } from './input-search';

const StyledInputSearch = styledComponent(CustomInputSearch)``;

export interface InputSearchProps extends IHtmlAttributes {
  allowClear?: boolean;
  placeholder?: string;
  onSearch?(value: string): void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  size?: EInputSize;
}

export function InputSearch({
  allowClear,
  placeholder,
  onSearch,
  onChange,
  className,
  'data-testid': dataTestId,
  value = '',
  size = EInputSize.Large,
}: InputSearchProps) {
  const passProps = {
    allowClear,
    placeholder,
    onSearch,
    onChange,
    className,
    value,
    size,
  };
  return <StyledInputSearch {...passProps} data-testid={dataTestId} />;
}
