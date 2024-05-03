import { IHtmlAttributes, noop } from '@front-end/core';

import { styledComponent } from '../../styled/styled';

import { default as CustomCheckbox } from './checkbox';

export interface CheckboxProps extends IHtmlAttributes {
  onChange?: () => void;
  value?: boolean;
}

const StyledCheckbox = styledComponent(CustomCheckbox)``;

export function Checkbox({
  'data-testid': dataTestId,
  children,
  className = '',
  onChange = noop,
  value = false,
}: CheckboxProps) {
  const passProps = { checked: value, onChange, children, className };

  return (
    <StyledCheckbox {...passProps} data-testid={dataTestId}></StyledCheckbox>
  );
}

export default Checkbox;
