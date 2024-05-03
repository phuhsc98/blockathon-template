import { TimePickerProps } from 'antd';
import { styledComponent } from '../../styled/styled';
import { default as CustomTimePicker } from './time-picker';

const StyledList = styledComponent((props) => <CustomTimePicker {...props} />)``;

export function TimePicker(passProps: TimePickerProps) {
  return <StyledList {...passProps} />;
}

export default TimePicker;
