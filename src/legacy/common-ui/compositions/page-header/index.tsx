import { ESpaceDirection, IHtmlAttributes } from '@front-end/core';
import { Breadcrumb, BreadcrumbItemProps, Flex } from '../../components';
import { Title } from '../../components/typography/title';
import { styledComponent } from '../../styled/styled';
import Space from '../space';

const StyledPageHeader = styledComponent(Flex)`
    padding: ${({ theme }) => theme.paddingContentVerticalLG}px ${({ theme }) =>
  theme.paddingContentHorizontalLG}px;
    background: ${({ theme }) => theme.colorBgElevated};
`;

const StyledTitle = styledComponent(Title)`
    margin: 0 !important;
`;

export interface PageHeaderProps extends IHtmlAttributes {
  breadcrumbItems?: BreadcrumbItemProps[];
  title?: string;
}

export function PageHeader({
  breadcrumbItems,
  title = '',
  className,
  'data-testid': dataTestId,
  children,
}: PageHeaderProps) {
  const passProps = {
    className,
  };

  return (
    <StyledPageHeader {...passProps} data-testid={dataTestId}>
      <Space direction={ESpaceDirection.Vertical} size='small' block>
        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
        {title && <StyledTitle level={4}>{title}</StyledTitle>}
        {children}
      </Space>
    </StyledPageHeader>
  );
}
