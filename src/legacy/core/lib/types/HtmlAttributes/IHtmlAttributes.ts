import { ReactNode } from 'react';

export interface IHtmlAttributes {
  children?: ReactNode;
  className?: string;
  [dataAttributes: `data-${string}`]: string;
}
