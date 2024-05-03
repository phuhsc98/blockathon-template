import { ReactNode, useMemo } from 'react';
import theme from 'antd/es/theme';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react/macro';
import { customToken } from '@front-end/core';

const { useToken } = theme;

export interface UIFrameworkContextProps {
  token?: object;
  children?: ReactNode;
}

export function ThemeProvider({ children }: UIFrameworkContextProps) {
  const { token: uiFrameworkToken } = useToken();
  const token = useMemo(
    () => ({ ...uiFrameworkToken, ...customToken }),
    [uiFrameworkToken]
  );

  return <EmotionThemeProvider theme={token}>{children}</EmotionThemeProvider>;
}

export default ThemeProvider;
