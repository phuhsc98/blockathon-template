import { styledComponent } from '../../../styled/styled';
import { ReactNode } from 'react';
import { default as CustomContent } from './content';

export interface ContentProps {
  className?: string;
  children?: ReactNode;
}

const StyledContent = styledComponent(CustomContent)``;

export function Content({ className, children }: ContentProps) {
  const passProps = {
    className,
  };

  return <StyledContent {...passProps}>{children || 'Content'}</StyledContent>;
}

export default Content;
