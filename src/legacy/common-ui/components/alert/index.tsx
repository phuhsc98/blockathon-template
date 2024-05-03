import { EAlertType, IHtmlAttributes } from '@front-end/core';
import { ReactNode } from 'react';
import { styledComponent } from '../../styled/styled';
import { default as CustomAlert } from './alert';

const StyledAlert = styledComponent(CustomAlert)``;

export interface AlertProps extends Omit<IHtmlAttributes, 'children'> {
  message?: ReactNode;
  description?: ReactNode;
  type?: EAlertType;
  showIcon?: boolean;
}

export function Alert({
  message = '',
  description = '',
  type = EAlertType.Warning,
  showIcon = true,
  className,
  'data-testid': dataTestId,
}: AlertProps) {
  const passProps = { message, description, showIcon, type, className };
  return <StyledAlert {...passProps} data-testid={dataTestId} />;
}

export default Alert;
