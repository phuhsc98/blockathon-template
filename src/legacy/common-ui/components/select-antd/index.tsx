import { SelectProps } from 'antd';
import { styledComponent } from '../../styled/styled';
import { default as CustomSelect } from './select';

const StyledSelect = styledComponent((props)=><CustomSelect {...props}/>)``;

export function SelectAntd(passProps: SelectProps) {
  return <StyledSelect {...passProps}/>;
}

export default SelectAntd;
