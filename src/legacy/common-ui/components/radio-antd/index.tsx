import { styledComponent } from '../../styled/styled';
import { default as CustomRadio } from './radio';
import { Radio, RadioProps as AntdRadioProps } from 'antd/es';

const StyledRadio = styledComponent(CustomRadio)``;

interface RadioProps extends Pick<AntdRadioProps, 'className' | 'children' | 'value'> {}

export function RadioAntd({ children, ...rest }: RadioProps) {
  return <StyledRadio {...rest}> {children} </StyledRadio>;
}

RadioAntd.Group = Radio.Group;

export default { RadioAntd };
