import { IHtmlAttributes, TBreakpoint } from '@front-end/core';
import { useElementSize, useTheme } from '@front-end/hooks';
import { useMemo } from 'react';

import {
  classNames,
  styledComponent,
  templateStringToClassName,
} from '../../../styled/styled';

export interface ContainerBreakpointProps extends IHtmlAttributes {
  breakpoint?: TBreakpoint;
}

const StyledContainer = styledComponent('div')`
`;

const StyledChild = styledComponent('div')`
`;

export function ContainerBreakpoint({
  className,
  breakpoint = 'xs',
  children,
  'data-testid': dataTestId,
}: ContainerBreakpointProps) {
  const theme = useTheme();
  const [ref, { width, height }] = useElementSize();

  const mapping = useMemo(
    () => [
      ['xs', theme.screenXSMax, theme.screenXS],
      ['sm', theme.screenSMMax, theme.screenSM],
      ['md', theme.screenMDMax, theme.screenMD],
      ['lg', theme.screenLGMax, theme.screenLG],
      ['xl', theme.screenXLMax, theme.screenXL],
      ['xxl', 4000, theme.screenXXL],
    ],
    [
      theme.screenLG,
      theme.screenLGMax,
      theme.screenMD,
      theme.screenMDMax,
      theme.screenSM,
      theme.screenSMMax,
      theme.screenXL,
      theme.screenXLMax,
      theme.screenXS,
      theme.screenXSMax,
      theme.screenXXL,
    ]
  );

  const widthChild = useMemo(() => {
    const foundIndex = mapping.findIndex((i) => i?.[0] === breakpoint) || -1;
    const filtered = mapping.filter((i, index) => index >= foundIndex);
    const found = filtered.find((i) => width <= i?.[1]);

    return found?.[2] ? `${found?.[2]}px` : 'unset';
  }, [breakpoint, mapping, width]);

  const passPropsContainer = { className };

  const passPropsChild = {
    className: classNames(
      className,
      templateStringToClassName()`
        width: ${widthChild};
      `
    ),
  };

  return (
    <StyledContainer ref={ref} {...passPropsContainer} data-testid={dataTestId}>
      <StyledChild {...passPropsChild}>{children}</StyledChild>
    </StyledContainer>
  );
}

export default ContainerBreakpoint;
