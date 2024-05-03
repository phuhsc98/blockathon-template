import { ReactNode } from 'react';

import { IHtmlAttributes } from '@front-end/core';

import { styledComponent } from '../../styled/styled';

import { default as CustomCard } from './card';
import { CardProps as CardPropsAnt } from 'antd';

const StyledCard = styledComponent(CustomCard)``;

export interface CardProps extends IHtmlAttributes, CardPropsAnt {
  // cover?: ReactNode;
  // extra?: ReactNode;
  // hoverable?: boolean;
  // title?: ReactNode;
}

export function Card({
  'data-testid': dataTestId,
  className,
  cover,
  extra,
  hoverable = true,
  title,
  children,
  type,
}: CardProps) {
  const passProps = {
    children,
    className,
    cover,
    title,
    extra,
    hoverable,
    type,
  };

  return <StyledCard {...passProps} data-testid={dataTestId} />;
}
