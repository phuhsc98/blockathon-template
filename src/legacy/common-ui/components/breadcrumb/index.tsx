import { IHtmlAttributes } from '@front-end/core';
import { ReactNode } from 'react';

import { styledComponent } from '../../styled/styled';
import { default as CustomBreadCrumbs } from './breadcrumb';

export interface BreadcrumbItemProps extends IHtmlAttributes {
  className?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  children?: ReactNode;
}

export interface BreadcrumbProps extends Omit<IHtmlAttributes, 'children'> {
  items?: BreadcrumbItemProps[];
  params?: object;
  separator?: ReactNode;
}

const StyledBreadcrumb = styledComponent(CustomBreadCrumbs)`
`;

export function Breadcrumb({
  params,
  separator,
  items,
  className,
  'data-testid': dataTestId,
}: BreadcrumbProps) {
  const passProps = { params, separator, className };

  return (
    <StyledBreadcrumb {...passProps} data-testid={dataTestId}>
      {items?.map(
        (
          { className, href, onClick, children, 'data-testid': dataTestIdItem },
          index
        ) => (
          <CustomBreadCrumbs.Item
            key={index}
            className={className}
            href={href}
            onClick={onClick}
            data-testid={dataTestIdItem}>
            {children}
          </CustomBreadCrumbs.Item>
        )
      )}
    </StyledBreadcrumb>
  );
}

export default Breadcrumb;
