import { ReactNode } from 'react';

import { styledComponent } from '../../styled/styled';

const StyledDiv = styledComponent('div')``;

export interface CardsGridProps {
  header?: ReactNode;
  hideHeader?: boolean;

  body?: ReactNode;
  hideBody?: boolean;

  footer?: ReactNode;
  hideFooter?: boolean;
}

export function CardsGrid({ header, hideHeader, body, hideBody, footer, hideFooter }: CardsGridProps) {
  return (
    <StyledDiv>
      {hideHeader ? null : header ? header : <div>add a header</div>}
      {hideBody ? null : body ? body : <div>add a body</div>}
      {hideFooter ? null : footer ? footer : <div>add a footer</div>}
    </StyledDiv>
  );
}
