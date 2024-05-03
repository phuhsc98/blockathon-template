import { IHtmlAttributes } from '@front-end/core';

import { styledComponent } from '../../styled/styled';

import { default as CustomInputGroup } from './input-group';

const StyledCustomInputGroup = styledComponent(CustomInputGroup)``;

export interface InputGroupProps extends IHtmlAttributes {
  compact?: boolean;
}

export function InputGroup({
  children,
  className,
  'data-testid': dataTestId,
  compact,
}: InputGroupProps) {
  const passProps = { children, className, compact };

  return <StyledCustomInputGroup {...passProps} data-testid={dataTestId} />;
}
