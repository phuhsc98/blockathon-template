import { FormEvent, ReactNode } from 'react';

import { LabeledValue } from 'antd/es/select';

import {
  EInputSize,
  IHtmlAttributes,
  noobj,
  noop,
  nostr,
} from '@front-end/core';

import { styledComponent } from '../../styled/styled';
import Option from '../option/option';

import { default as CustomSelect } from './select';

export type ValueType =
  | string
  | string[]
  | number
  | number[]
  | LabeledValue
  | LabeledValue[]
  | FormEvent<HTMLInputElement>;

export interface ISelectOption {
  disable?: boolean;
  label: string | number;
  value: string | number;
  key?: string | number;
  children?: ReactNode;
}
export interface SelectProps extends IHtmlAttributes {
  allowClear?: boolean;
  block?: boolean;
  defaultValue?: ValueType;
  disabled?: boolean;
  listHeight?: number;
  loading?: boolean;
  optionLabelProp?: string;
  options?: ISelectOption[];
  placeholder?: string | null;
  showSearch?: boolean;
  size?: EInputSize;
  style?: { [key: string]: string | number };
  value?: ValueType;
  defaultActiveFirstOption?: boolean;
  filterOption?: boolean;
  onChange?: (value: any, option: unknown) => void;
  onClear?: () => void;
  onPopupScroll?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSearch?: (value: string) => void;
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  name?: string;
  mode?: 'multiple' | 'tags' | undefined;
}

export const StyledSelect = styledComponent(CustomSelect)``;

export function Select({
  allowClear = true,
  block = true,
  'data-testid': dataTestId,
  defaultValue,
  disabled = false,
  listHeight = 256,
  loading = false,
  optionLabelProp = 'label',
  options = [],
  placeholder = nostr,
  showSearch = true,
  size = EInputSize.Large,
  style = noobj,
  value,
  defaultActiveFirstOption = true,
  filterOption = true,
  onChange = noop,
  onClear = noop,
  onPopupScroll = noop,
  onFocus = noop,
  onBlur = noop,
  onSearch = noop,
  dropdownRender,
  className,
  name = '',
  mode = undefined,
}: SelectProps) {
  // const handleChange = (value: unknown) => {
  //   const itemFound = options.find((option) => option.value === value);

  //   onChange(value, itemFound);
  // };
  // const handleClear = () => onClear();
  // const handlePopupScroll = () => onPopupScroll();
  // const handleFocus = () => onFocus();
  // const handleBlur = () => onBlur();
  // const handleSearch = (value: string) => onSearch(value);
  const passProps = {
    allowClear,
    defaultValue,
    disabled,
    listHeight,
    loading,
    optionLabelProp,
    placeholder,
    showSearch,
    style: { width: block ? '100%' : '16rem', ...style },
    value,
    size,
    defaultActiveFirstOption,
    filterOption,
    onChange,
    onClear,
    onPopupScroll,
    onFocus,
    onBlur,
    onSearch,
    dropdownRender,
    className,
    name,
    mode,
  };

  return (
    <StyledSelect {...passProps} data-testid={`${dataTestId}__select`}>
      {options.map((item, index) => (
        <Option
          key={item.key || item.value}
          value={item.value}
          label={item.label}
          data-testid={`${dataTestId}__option`}>
          {item.children || item.label}
        </Option>
      ))}
    </StyledSelect>
  );
}

export default Select;
