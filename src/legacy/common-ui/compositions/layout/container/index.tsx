import { IHtmlAttributes } from '@front-end/core';

import { styledComponent } from '../../../styled/styled';

export interface ContainerProps extends IHtmlAttributes {
  className?: string;
}

const StyledContainer = styledComponent('div')`
`;

export function Container({
  className,
  children,
  'data-testid': dataTestId,
}: ContainerProps) {
  const passProps = {
    className,
  };

  return (
    <StyledContainer {...passProps} data-testid={dataTestId}>
      {children}
    </StyledContainer>
  );
}

export default Container;
