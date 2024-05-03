import { DropDownProps } from 'antd';
import { styledComponent } from '../../styled/styled';

import { default as CustomDropdown } from './dropdown';

const StyledDropdown = styledComponent(CustomDropdown)``;

export function DropdownAntd(props: DropDownProps) {
  return <StyledDropdown {...props} />;
}
