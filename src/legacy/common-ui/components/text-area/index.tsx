import { EInputSize, IHtmlAttributes, noop } from '@front-end/core';

import { styledComponent } from '../../styled/styled';

import { default as CustomTextArea } from './text-area';

const StyledTextArea = styledComponent(CustomTextArea)``;

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}
export interface TextAreaProps
  extends Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      'onResize' | 'placeholder'
    >,
    Omit<IHtmlAttributes, 'children'> {
  autoSize?: boolean | AutoSizeType;
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  onResize?: (size: { width: number; height: number }) => void;
  allowClear?: boolean;
  bordered?: boolean;
  // showCount?: boolean | ShowCountProps;
  showCount?: boolean;
  disabled?: boolean;
  placeholder?: string | null;

  // status?: InputStatus;
}

export function TextArea({
  'data-testid': dataTestId,
  allowClear = false,
  autoSize = true,
  bordered = true,
  className,
  disabled = false,
  onChange = noop,
  onPressEnter = noop,
  onResize = noop,
  placeholder,
  rows,
  showCount = true,
  value,
  maxLength,
  name,
}: TextAreaProps) {
  const passProps = {
    allowClear,
    autoSize,
    bordered,
    className,
    disabled,
    onChange,
    onPressEnter,
    onResize,
    placeholder: placeholder ?? '',
    rows,
    showCount,
    value,
    maxLength,
    name,
  };

  return <StyledTextArea {...passProps} data-testid={dataTestId} />;
}
