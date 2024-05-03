import { Key, ReactNode } from 'react';

import { default as AntdDropdown } from 'antd/es/dropdown';

import { EDropdownPosition, IHtmlAttributes, noarr } from '@front-end/core';

import { styledComponent } from '../../styled/styled';

/* eslint-disable-next-line */
export interface ItemProps {
  danger?: boolean;
  disabled?: boolean;
  itemIcon?: ReactNode;
  key: Key;
  label?: string | ReactNode;
  onClick?(): void;
}

export interface DropdownProps extends IHtmlAttributes {
  arrow?: boolean;
  disabled?: boolean;
  items?: ItemProps[];
  open?: boolean;
  placement?: EDropdownPosition;
}

const StyledDropdown = styledComponent(AntdDropdown)``;

export function Dropdown({
  arrow = false,
  children = null,
  'data-testid': dataTestId,
  disabled = false,
  items = noarr,
  open = false,
  placement = EDropdownPosition.BottomLeft,
  className,
}: DropdownProps) {
  const passProps = { arrow, disabled, open, placement, className };

  return (
    <StyledDropdown
      {...passProps}
      menu={{ items }}
      trigger={['click', 'hover']}
      data-testid={dataTestId}>
      {children}
    </StyledDropdown>
  );
}

export default Dropdown;
