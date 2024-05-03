import { IHtmlAttributes, noop } from '@front-end/core';
import { ReactNode } from 'react';

import { styledComponent } from '../../styled/styled';

import { default as DefaultPagination } from './pagination';

const StyledPagination = styledComponent(DefaultPagination)``;

export interface PaginationProps extends IHtmlAttributes {
  current?: number;
  defaultCurrent?: number;
  defaultPageSize?: number;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  onChange?(page: number, pageSize: number): void;
  pageSize?: number;
  pageSizeOptions?: Array<number>;
  showQuickJumper?: boolean | { goButton: ReactNode };
  total?: number;
}

export function Pagination({
  'data-testid': dataTestId,
  className,
  current = 1,
  defaultCurrent = 1,
  defaultPageSize = 10,
  disabled = false,
  hideOnSinglePage = false,
  onChange = noop,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  showQuickJumper = true,
  total = 0,
}: PaginationProps) {
  const passProps = {
    className,
    current,
    defaultCurrent,
    defaultPageSize,
    disabled,
    hideOnSinglePage,
    onChange,
    pageSize,
    pageSizeOptions,
    showQuickJumper,
    total,
  };

  return <StyledPagination {...passProps} data-testid={dataTestId} />;
}
