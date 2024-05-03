// import { ReactNode } from 'react';

// import { ESpinSize, IHtmlAttributes } from '@front-end/core';

import { styledComponent } from '../../styled/styled';

import { default as CustomSpin } from './spin';

const StyledSpin = styledComponent(CustomSpin)``;

declare const SpinSizes: readonly ['small', 'default', 'large'];
export type SpinSize = (typeof SpinSizes)[number];
export type SpinIndicator = React.ReactElement<HTMLElement>;

export interface SpinProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  spinning?: boolean;
  style?: React.CSSProperties;
  size?: SpinSize;
  tip?: React.ReactNode;
  delay?: number;
  wrapperClassName?: string;
  indicator?: SpinIndicator;
  children?: React.ReactNode;
  dataTestId: string;
}

export function Spin(passProps: Partial<SpinProps>) {
  // const passProps = {
  //   prefixCls,
  //   className,
  //   rootClassName,
  //   spinning,
  //   style,
  //   size,
  //   tip,
  //   delay,
  //   wrapperClassName,
  //   indicator,
  //   children,
  //  };

  return (
    <StyledSpin {...passProps} data-testid={`${passProps.dataTestId}__spin`}>
      {passProps.children}
    </StyledSpin>
  );
}

export default Spin;
