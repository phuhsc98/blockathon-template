import {
  EDatePicker,
  EDatePickerSize,
  getDateTimeObject,
  IHtmlAttributes,
  noop,
  TDateTime,
} from '@front-end/core';
import {
  classNames,
  styledComponent,
  templateStringToClassName,
} from '../../styled/styled';

import { default as CustomRangePicker } from './range-picker';

export interface RangePickerProps extends IHtmlAttributes {
  block?: boolean;
  onCalendarChange?: (data: any) => void;
  onChange?: (dates: any, dateStrings: [string, string]) => void;
  picker?: EDatePicker;
  placeholder?: [string, string];
  size?: EDatePickerSize;
  value?: [unknown, unknown];
}

const StyledRangePicker = styledComponent(CustomRangePicker)``;

export function RangePicker({
  'data-testid': dataTestId,
  block = true,
  className = '',
  onCalendarChange = noop,
  onChange = noop,
  picker,
  placeholder,
  size = EDatePickerSize.Middle,
  value = [undefined, undefined],
}: RangePickerProps) {
  const passProps = {
    picker,
    size,
    placeholder,
    className: classNames(
      className,
      templateStringToClassName()`
        width: ${block ? '100%' : 'auto'};
      `
    ),
    onChange,
    onCalendarChange,
    value: [getDateTimeObject(value?.[0]), getDateTimeObject(value?.[1])] as [
      TDateTime,
      TDateTime
    ],
  };

  return <StyledRangePicker data-testid={dataTestId} {...passProps} />;
}

export default RangePicker;
