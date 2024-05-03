import { useState, useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseSetData {}

export function useSetData<T = string>(initialValue: T) {
  const [data, setData] = useState<T>(initialValue);

  const onSetData = useCallback((newData: T) => {
    setData(newData);
  }, []);

  return { data, onSetData };
}

export default useSetData;
