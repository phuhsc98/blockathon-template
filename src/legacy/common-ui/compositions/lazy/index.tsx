import { ReactNode } from 'react';
import { lazy as customLazy, Suspense as CustomSuspense } from './lazy';

export interface SuspenseProps {
  fallback?: ReactNode;
  children?: ReactNode;
}

export const Fallback = <div>Loading...</div>;

export function Suspense({ fallback = Fallback, children }: SuspenseProps) {
  const passProps = {
    fallback,
  };

  return <CustomSuspense {...passProps}>{children}</CustomSuspense>;
}

export const lazy = <T,>(
  factory: () => Promise<{
    default: React.ComponentType<T>;
  }>,
  preload = true
) => {
  const Component = customLazy(factory);

  if (preload) {
    Component.preload();
  }

  return Component;
};

export default Suspense;
