import { EBaseType, IHtmlAttributes } from '@front-end/core';

import { styledComponent } from '../../../styled/styled';

import { default as CustomTitle } from './title';

declare const TITLE_ELE_LIST: [1, 2, 3, 4, 5];

export interface TitleProps extends IHtmlAttributes {
  level?: (typeof TITLE_ELE_LIST)[number];
  type?: EBaseType;
}

const StyledTitle = styledComponent(CustomTitle)`
  margin: 0px !important;
`;

export function Title({
  level = TITLE_ELE_LIST[1],
  type,
  children,
  className,
  'data-testid': dataTestId,
}: TitleProps) {
  const passProps = { level, type, className };

  return (
    <StyledTitle {...passProps} data-testid={dataTestId}>
      {children || 'Title'}
    </StyledTitle>
  );
}

export default Title;
