import React, { createElement, CSSProperties, ReactNode } from 'react';
import styled from '@emotion/styled/macro';
import { cx, css as cssEmotionCss } from '@emotion/css/macro';
import { css as cssEmotionReact } from '@emotion/react/macro';

import { As, PropsOf } from './types';
import { noop } from '@front-end/core';

type CommonComponentProps = {
  className?: string;
  containerClass?: string;
  'data-testid'?: string;
  dataTestId?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

type CommonDivProps = {
  onClick?(): void;
};

// export function styledComponent<T = unknown>(Component: React.ElementType) {
//   function CustomComponent({
//     className = '',
//     containerClass = '',
//     dataTestId = '',
//     ...rest
//   }: T & CommonComponentProps) {
//     return (
//       <Component className={cx(className, containerClass)} {...rest} data-testid={dataTestId} dataTestId={dataTestId} />
//     );
//   }

/**
 * Custom `styled` for project
 * @param component Pass down component, "div" | Component
 * @returns React element
 *
 * @example
 * const StyledDiv = styledComponent("div")`style: goes-here;`
 * const StyledBtn = styledComponent(Button)`override-style: goes-here;`
 *
 * @note
 * for preventing DOM error, DON'T pass style props down.
 *
 * ❌ DON'T
 * ```js
 * const StyledDiv = styledComponent("div")<{width: string | number;}>`width: ${props => props.width};`
 * ```
 * ✅ DO
 * ```js
 * const conatinerClass = templateStringToClassName()`width: ${width};`
 * <StyleDiv containerClass={containerClass} />
 * ```
 */
export function styledComponent<C extends As, P extends PropsOf<C>>(
  component: C
) {
  const ForwardRefComponent = React.forwardRef<
    HTMLElement,
    P & { containerClass?: string }
  >(function Component({ containerClass, className, ...restProps }, ref) {
    return React.createElement(component, {
      ref,
      className: cx(className, containerClass),
      ...restProps,
    });
  });

  return styled(ForwardRefComponent);
}

// common-ui Container
export function styledDiv<T = unknown>() {
  function CustomComponent({
    className = '',
    containerClass = '',
    dataTestId = '',
    onClick = noop,
    children,
  }: CommonComponentProps & CommonDivProps & T) {
    return (
      <div
        onClick={onClick}
        className={cx(className, containerClass)}
        data-testid={dataTestId}>
        {children}
      </div>
    );
  }

  return styled(CustomComponent);
}

export function styledForm() {
  function CustomComponent({ className = '', containerClass = '', ...rest }) {
    return <form className={cx(className, containerClass)} {...rest} />;
  }

  return styled(CustomComponent);
}

export function styledTag(tag: string) {
  function CustomComponent({ className = '', containerClass = '', ...rest }) {
    return createElement(tag, {
      className: cx(className, containerClass),
      ...rest,
    });
  }

  return styled(CustomComponent);
}

export function templateStringToObjectStyle() {
  return cssEmotionReact;
}

export function templateStringToClassName() {
  return cssEmotionCss;
}

export function classNames(...arg: any) {
  return cx(...arg);
}
