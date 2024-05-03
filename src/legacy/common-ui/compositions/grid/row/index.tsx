import { useMemo, Children, cloneElement } from 'react';

import {
  ESize,
  Gutter,
  IHtmlAttributes,
  noop,
  TBreakpoint,
} from '@front-end/core';
import { useTheme } from '@front-end/hooks';

import {
  styledComponent,
  templateStringToClassName,
} from '../../../styled/styled';

import { default as CustomRow } from './row';
import { Col } from '@front-end/common-ui';

export interface RowProps extends IHtmlAttributes {
  align?:
    | 'top'
    | 'middle'
    | 'bottom'
    | 'stretch'
    | { [key in TBreakpoint]: 'top' | 'middle' | 'bottom' | 'stretch' };
  colSize?: number | number[] | object | object[];
  hidden?: boolean;
  gutter?: Gutter | [Gutter, Gutter];
  justify?:
    | 'start'
    | 'end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | {
        [key in TBreakpoint]:
          | 'start'
          | 'end'
          | 'center'
          | 'space-around'
          | 'space-between'
          | 'space-evenly';
      };
  wrap?: boolean;
  onClick?: () => any;
  padding?: ESize | ESize[];
}

const StyledRow = styledComponent(CustomRow)``;

export function Row({
  align = 'top',
  colSize,
  hidden = false,
  gutter,
  justify = 'start',
  wrap = true,
  onClick = noop,
  padding = ESize.NONE,
  children,
  'data-testid': dataTestId,
  className,
}: RowProps) {
  const theme = useTheme();
  const spaceMapping = useMemo(
    () => ({
      [ESize.SM]: theme?.marginSM,
      [ESize.N]: theme?.margin,
      [ESize.MD]: theme?.marginMD,
      [ESize.LG]: theme?.marginLG,
    }),
    [theme]
  );
  const paddingStr = useMemo(() => {
    if (padding === ESize.NONE) {
      return '0px';
    }
    if (padding instanceof Array) {
      return padding.map((p) => `${spaceMapping?.[p]}px`);
    }
    return `${spaceMapping?.[padding]}px`;
  }, [padding, spaceMapping]);

  const passProps = {
    align,
    gutter: gutter || [theme.paddingLG, theme.paddingSM],
    justify,
    wrap,
    onClick,
    containerClass: templateStringToClassName()`
      padding: ${paddingStr}
    `,
    'data-testid': dataTestId,
    className,
  };

  if (hidden) {
    return null;
  }

  return (
    <StyledRow {...passProps}>
      {typeof colSize === 'number' &&
        Children.map(children, (child: any) => (
          <Col span={colSize}>{cloneElement(child)}</Col>
        ))}

      {Array.isArray(colSize) &&
        Children.map(children, (child: any, index: number) => {
          if (typeof colSize?.[index] === 'number') {
            return <Col span={colSize?.[index]}>{cloneElement(child)}</Col>;
          } else {
            return (
              <Col {...(colSize?.[index] || {})}>{cloneElement(child)}</Col>
            );
          }
        })}

      {!colSize && children}
    </StyledRow>
  );
}

export default Row;
