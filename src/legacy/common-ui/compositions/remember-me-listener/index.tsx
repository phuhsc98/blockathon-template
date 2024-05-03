import { useStoreToken } from '@front-end/core';
import { memo, useCallback, useEffect, useRef } from 'react';

export function RememberMeListener() {
  const { setToken, rememberMe } = useStoreToken((state: any) => ({
    setToken: state.setToken,
    rememberMe: state.rememberMe,
  }));

  const rememberMeRef = useRef();
  rememberMeRef.current = rememberMe;

  const cleanToken = useCallback(
    (e) => {
      e.preventDefault();
      if (!rememberMeRef.current) setToken('');
    },
    [setToken]
  );

  useEffect(() => {
    window.addEventListener('beforeunload', cleanToken);
    return () => {
      window.removeEventListener('beforeunload', cleanToken);
    };
  }, [cleanToken]);
  return null;
}

export default memo(RememberMeListener);
