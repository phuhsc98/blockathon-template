import { useTheme } from '@front-end/hooks';
import { ReactNode } from 'react';
import { styledComponent } from '../../../styled/styled';
import { default as CustomLayout } from './layout';

export interface LayoutProps {
  className?: string;
  children?: ReactNode;
}

const StyledLayout = styledComponent(CustomLayout)``;

export function Layout({ className, children }: LayoutProps) {
  const passProps = { className };
  const theme = useTheme();

  return (
    <StyledLayout style={{ backgroundColor: `${theme?.colorBgLayout}` }} {...passProps}>
      {children}
    </StyledLayout>
  );
}
