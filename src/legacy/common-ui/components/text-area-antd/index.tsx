import { styledComponent } from '../../styled/styled';

import { default as CustomTextArea } from './text-area-antd';
import { TextAreaProps } from 'antd/es/input';

const StyledTextArea = styledComponent(CustomTextArea)``;

export function TextAreaAntd(passProps: TextAreaProps) {

  return <StyledTextArea {...passProps} autoSize/>;
}
