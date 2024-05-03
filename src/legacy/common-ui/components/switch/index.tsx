import { ReactNode } from 'react';

import { IHtmlAttributes, noop } from '@front-end/core';

import { styledComponent } from '../../styled/styled';

import { default as CustomSwitch } from './switch';

const StyledSwitch = styledComponent(CustomSwitch)``;

export interface SwitchProps extends IHtmlAttributes {
  checked?: boolean;
  checkedChildren?: ReactNode;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  unCheckedChildren?: ReactNode;
  size?: 'small' | 'default';
}

export function Switch({
  'data-testid': dataTestId,
  checked = false,
  checkedChildren = '',
  className = '',
  disabled = false,
  onChange = noop,
  unCheckedChildren = '',
  size = 'default',
}: SwitchProps) {
  const passProps = {
    checked,
    onChange,
    className,
    disabled,
    checkedChildren,
    unCheckedChildren,
    size,
  };

  return <StyledSwitch {...passProps} data-testid={dataTestId} />;
}
