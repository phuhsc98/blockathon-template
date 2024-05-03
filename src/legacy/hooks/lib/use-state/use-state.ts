import { Dispatch, useState as useCustomState } from 'react';

export function useState<S>(props?: S | (() => S)): [S | undefined, Dispatch<React.SetStateAction<S | undefined>>] {
  const [state, setState] = useCustomState<S | undefined>(props);

  return [state, setState];
}

export default useState;
