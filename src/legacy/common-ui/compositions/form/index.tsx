import { IHtmlAttributes, noop } from '@front-end/core';

import { styledComponent } from '../../styled/styled';
export interface FormProps extends IHtmlAttributes {
  onSubmit?: any;
  name?: string;
  id?: string;
}

const StyledForm = styledComponent('form')``;

export function Form({
  onSubmit = noop,
  children,
  className,
  name,
  id,
}: FormProps) {
  const passProps = { onSubmit, className, name, id };

  return <StyledForm {...passProps}>{children}</StyledForm>;
}

export default Form;
