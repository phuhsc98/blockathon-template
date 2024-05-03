import { default as CustomEmpty } from './empty';
import { styledComponent } from '../../styled/styled';
import { CSSProperties, ReactNode } from 'react';

export interface EmptyProps {
  description?: ReactNode;
  imageStyle?: CSSProperties;
}

const StyledEmpty = styledComponent(CustomEmpty)``;

export function Empty({ description, imageStyle }: EmptyProps) {
  const passProps = { description, imageStyle };

  return <StyledEmpty {...passProps}></StyledEmpty>;
}

export default Empty;
