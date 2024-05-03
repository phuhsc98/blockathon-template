import { EResultStatusType } from '@front-end/core';
import { ReactNode } from 'react';
import { styledComponent } from '../../styled/styled';
import { default as CustomResult } from './result';

export interface ResultProps {
  icon?: ReactNode;
  status?: EResultStatusType;
  title?: string;
  subTitle?: string;
  extra?: ReactNode;
}

export const StyledResult = styledComponent(CustomResult)``;

export function Result({
  icon,
  status = EResultStatusType.Info,
  title,
  subTitle,
  extra,
}: ResultProps) {
  const passProps = { icon, status, title, subTitle, extra };

  return <StyledResult {...passProps}></StyledResult>;
}

export default Result;
