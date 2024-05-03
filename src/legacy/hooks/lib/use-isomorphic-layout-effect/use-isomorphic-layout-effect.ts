import { useEffect, useLayoutEffect } from 'react';

export interface UseIsomorphicLayoutEffect {
  count: number;
  increment: () => void;
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
