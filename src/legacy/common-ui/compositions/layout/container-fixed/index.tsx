import { useTheme } from '@emotion/react/macro';
import { IHtmlAttributes, TBreakpoint } from '@front-end/core';

import {
  classNames,
  styledComponent,
  templateStringToClassName,
} from '../../../styled/styled';

export interface ContainerFixedProps extends IHtmlAttributes {
  breakpoint?: TBreakpoint;
  position?: 'left' | 'center' | 'right';
}

const StyledContainer = styledComponent('div')`
`;

export function ContainerFixed({
  'data-testid': dataTestId,
  breakpoint = 'xs',
  className,
  position = 'left',
  children,
}: ContainerFixedProps) {
  const theme = useTheme();

  const passProps = {
    className: classNames(
      className,
      templateStringToClassName()`
        width: 100%;
        max-width: ${(() => {
          switch (breakpoint) {
            case 'xs':
              return theme.screenXS;
            case 'sm':
              return theme.screenSM;
            case 'md':
              return theme.screenMD;
            case 'lg':
              return theme.screenLG;
            case 'xl':
              return theme.screenXL;
            case 'xxl':
              return theme.screenXXL;

            default:
              return 'md';
          }
        })()}px;
        ${(() => {
          switch (position) {
            case 'center':
              return 'margin: auto';
            case 'right':
              return 'margin-left: auto; margin-right: 0;';

            default:
              return '';
          }
        })()}
      `
    ),
  };

  return (
    <StyledContainer {...passProps} data-testid={dataTestId}>
      {children}
    </StyledContainer>
  );
}

export default ContainerFixed;
