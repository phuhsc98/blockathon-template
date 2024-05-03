import { EJustifyContent, noop } from '@front-end/core';
import { ReactNode } from 'react';
import { styledComponent } from '../../styled/styled';
import { default as CustomRadioGroup } from './radio-group';

export interface RadioGroupProps {
  buttonStyle?: 'outline' | 'solid';
  defaultValue?: any;
  disabled?: boolean;
  name?: string;
  onChange?: (e: any) => void;
  optionType?: 'default' | 'button';
  options?:
    | string[]
    | number[]
    | Array<{ label: ReactNode; value: string; disabled?: boolean }>;
  size?: 'large' | 'middle' | 'small';
  value?: any;
  children?: ReactNode;
  justify?: EJustifyContent;
}

const StyledRadioGroup = styledComponent(CustomRadioGroup)`
${(props: any) =>
  props.justify
    ? `display: flex;
    width: 100%;
    justify-content: ${props.justify};`
    : ``}
`;

export function RadioGroup({
  justify,
  buttonStyle = 'outline',
  defaultValue,
  disabled = false,
  name,
  optionType = 'default',
  options,
  size,
  value,
  onChange = noop,
  children,
}: RadioGroupProps) {
  const passProps = {
    buttonStyle,
    defaultValue,
    disabled,
    name,
    optionType,
    options,
    size,
    onChange,
    justify,
    value,
  };
  return (
    <StyledRadioGroup {...passProps}>
      {children || 'This is radio group'}
    </StyledRadioGroup>
  );
}

export default RadioGroup;
