import { Checkbox } from '@front-end/common-ui';
import { useStoreToken } from '@front-end/core';
import { memo } from 'react';
import shallow from 'zustand/shallow';

export function RememberMeCheckBox() {
  const { rememberMe, setRememberMe } = useStoreToken(
    (state: any) => ({
      setRememberMe: state.setRememberMe,
      rememberMe: state.rememberMe,
    }),
    shallow
  );

  return (
    <Checkbox onChange={() => setRememberMe(!rememberMe)} value={rememberMe}>
      Remember me
    </Checkbox>
  );
}

export default memo(RememberMeCheckBox);
