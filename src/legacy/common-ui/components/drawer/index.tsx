import { styledComponent } from '../../styled/styled';
import { default as CustomDrawer } from './drawer';
import { DrawerProps as AntDrawerProps } from 'antd';

export interface DrawerProps
  extends Pick<
    AntDrawerProps,
    | 'className'
    | 'title'
    | 'placement'
    | 'onClose'
    | 'open'
    | 'getContainer'
    | 'mask'
    | 'closable'
    | 'children'
    | 'width'
  > {
  //
}

const StyledDrawer = styledComponent(CustomDrawer)``;

export function Drawer({ children, ...rest }: DrawerProps) {
  return <StyledDrawer {...rest}>{children}</StyledDrawer>;
}

export default Drawer;
