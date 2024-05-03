import { ReactNode } from 'react';

import { styledComponent } from '../../styled/styled';
import { IHtmlAttributes } from '@front-end/core';

export interface PageProps extends IHtmlAttributes {
  containerClass?: string;
  contentClass?: string;
  header?: ReactNode;
}

const StyledContainer = styledComponent('div')`
`;

const StyledContent = styledComponent('div')`
  padding: ${({ theme }) => theme.paddingLG}px;
`;

export function Page({
  containerClass,
  contentClass,
  header,
  children,
}: PageProps) {
  return (
    <StyledContainer className={containerClass}>
      {header}
      <StyledContent className={contentClass}>{children}</StyledContent>
    </StyledContainer>
  );
}

export default Page;
