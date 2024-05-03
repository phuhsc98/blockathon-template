import { ESpaceDirection, ESpaceAlign, IHtmlAttributes } from '@front-end/core';
import { ReactNode } from 'react';
import {
  styledComponent,
  templateStringToClassName,
} from '../../styled/styled';
import { default as CustomSpace } from './space';

export type SizeType = 'small' | 'middle' | 'large' | undefined;
export type SpaceSize = SizeType | number;

export interface SpaceProps extends IHtmlAttributes {
  align?: ESpaceAlign;
  block?: boolean;
  direction?: ESpaceDirection;
  size?: SpaceSize | [SpaceSize, SpaceSize];
  split?: ReactNode;
  wrap?: boolean;
}

const StyledSpace = styledComponent(CustomSpace)``;

export function Space({
  align = ESpaceAlign.Start,
  block = false,
  direction = ESpaceDirection.Horizontal,
  size = 'middle',
  split,
  wrap = true,
  children,
  className,
}: SpaceProps) {
  const passProps = { align, direction, split, wrap, size, className };

  return (
    <StyledSpace
      {...passProps}
      containerClass={templateStringToClassName()`
        width: ${block ? '100%' : 'auto'};

        &>.ant-space-item {
          width: ${block ? '100%' : 'auto'};
        }
      `}>
      {children}
    </StyledSpace>
  );
}

export default Space;
