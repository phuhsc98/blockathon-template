import { styledComponent } from '../../styled/styled';
import { default as CustomInputText } from './input';
import { InputProps } from 'antd';

export const StyledInputAntd = styledComponent(CustomInputText)``;

export const InputAntd = (props: InputProps) => {
  return <StyledInputAntd {...props} />;
};

export default InputAntd;
