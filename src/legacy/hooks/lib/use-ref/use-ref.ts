import { useRef as useCustomRef } from 'react';

export interface UseRefProps<T> {
  current: T | null;
}

export function useRef<T>(props: T | null): UseRefProps<T> {
  const ref = useCustomRef<T>(props);

  return ref;
}

export default useRef;
