import {
  styledComponent,
  templateStringToClassName,
} from '@legacy/common-ui/styled/styled';
import { useTheme } from '@emotion/react/macro';
import { IHtmlAttributes } from '@front-end/core';

import { ReactNode } from 'react';

export interface AbsoluteTagProps extends IHtmlAttributes {
  leftTop?: ReactNode;
  rightTop?: ReactNode;
  leftBottom?: ReactNode;
  rightBottom?: ReactNode;
  className?: string;
}

const StyledAbsoluteTag = styledComponent('div')`
  position: relative;
`;

export function AbsoluteTag({
  leftTop,
  rightTop,
  leftBottom,
  rightBottom,
  className,
  children,
}: AbsoluteTagProps) {
  const theme = useTheme();

  return (
    <StyledAbsoluteTag className={className}>
      {leftTop && (
        <div
          className={templateStringToClassName()`
            position: absolute;
            z-index: 99;
            top: ${theme.paddingXS}px;
            left: ${theme.paddingXS}px;
          `}>
          {leftTop}
        </div>
      )}
      {rightTop && (
        <div
          className={templateStringToClassName()`
            position: absolute;
            z-index: 99;
            top: ${theme.paddingXS}px;
            right: ${theme.paddingXS}px;
          `}>
          {rightTop}
        </div>
      )}
      {leftBottom && (
        <div
          className={templateStringToClassName()`
            position: absolute;
            z-index: 99;
            bottom: ${theme.paddingXS}px;
            left: ${theme.paddingXS}px;
          `}>
          {leftBottom}
        </div>
      )}
      {rightBottom && (
        <div
          className={templateStringToClassName()`
            position: absolute;
            z-index: 99;
            bottom: ${theme.paddingXS}px;
            right: ${theme.paddingXS}px;
          `}>
          {rightBottom}
        </div>
      )}
      {children}
    </StyledAbsoluteTag>
  );
}

export default AbsoluteTag;
