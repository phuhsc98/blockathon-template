import { ReactNode } from 'react';

import { ThemeProvider } from './theme-provider/theme-provider';
import { noobj } from '@front-end/core';
import UIFrameworkConfigProvider from './ui-framework-provider/ui-framework-provider';
import { SeedToken } from 'antd/es/theme/internal';
import { MapToken, OverrideToken } from 'antd/es/theme/interface';

export interface ThemeContextProps {
  token?: object;
  children?: ReactNode;
  components?: OverrideToken;

  algorithm?: ((token: SeedToken) => MapToken) | 'default' | 'dark' | 'compact';
}

export function ThemeContext({
  token = noobj,
  components = noobj,
  algorithm,
  children,
}: ThemeContextProps) {
  return (
    <UIFrameworkConfigProvider
      components={components}
      token={token}
      algorithm={algorithm}>
      <ThemeProvider>{children}</ThemeProvider>
    </UIFrameworkConfigProvider>
  );
}

export default ThemeContext;
