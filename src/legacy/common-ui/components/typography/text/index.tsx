import React, { ReactNode } from 'react';

import { EBaseType, ETextAlign, IHtmlAttributes } from '@front-end/core';

import {
  styledComponent,
  templateStringToClassName,
} from '../../../styled/styled';

import { default as CustomText } from './text';

interface CopyConfig {
  text?: string;
  onCopy?: (event?: React.MouseEvent<HTMLDivElement>) => void;
  icon?: ReactNode;
  tooltips?: boolean | ReactNode;
  format?: 'text/plain' | 'text/html';
}
export interface TextProps extends IHtmlAttributes {
  copyable?: boolean | CopyConfig;
  strong?: boolean;
  italic?: boolean;
  code?: boolean;
  ellipsis?: boolean;
  textAlign?: ETextAlign;
  type?: EBaseType;
  underline?: boolean;
  wrap?: boolean;
  level?: number;
  fontSize?: string;
}

const StyledText = styledComponent(CustomText)``;
const StyledWrapperText = styledComponent('div')` 
`;

export function Text({
  code = false,
  copyable = false,
  italic = false,
  ellipsis = false,
  strong = false,
  textAlign = ETextAlign.Left,
  type,
  underline = false,
  wrap = false,
  children,
  'data-testid': dataTestId,
  fontSize,
}: TextProps) {
  const passProps = {
    copyable,
    strong,
    italic,
    type,
    underline,
    ellipsis,
    code,
  };

  const textComponent = (
    <StyledText
      {...passProps}
      data-testid={dataTestId}
      className={templateStringToClassName()`
    font-size: ${fontSize};
`}>
      {children}
    </StyledText>
  );

  return wrap ? (
    <StyledWrapperText
      className={templateStringToClassName()` 
        text-align: ${textAlign}; 
    `}>
      {textComponent}
    </StyledWrapperText>
  ) : (
    textComponent
  );
}

export default Text;
