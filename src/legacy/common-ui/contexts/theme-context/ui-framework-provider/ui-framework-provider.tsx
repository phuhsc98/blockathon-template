import { ReactNode } from 'react';
import ConfigProvider from 'antd/es/config-provider';
import { noobj } from '@front-end/core';
import { ThemeConfig } from 'antd/es/config-provider/context';
import theme from 'antd/es/theme';
import { AliasToken, SeedToken } from 'antd/es/theme/internal';
import { MapToken, OverrideToken } from 'antd/es/theme/interface';

export interface UIFrameworkConfigProviderProps {
  token?: Partial<AliasToken>;
  components?: OverrideToken;
  children?: ReactNode;
  algorithm?: ((token: SeedToken) => MapToken) | 'default' | 'dark' | 'compact';
}

export function UIFrameworkConfigProvider({
  token = noobj,
  algorithm = 'default',
  components = noobj,
  children,
}: UIFrameworkConfigProviderProps) {
  const algorithmDefaultMapping = {
    default: theme.defaultAlgorithm,
    dark: theme.darkAlgorithm,
    compact: theme.compactAlgorithm,
  };
  const antdTheme: ThemeConfig = {
    token: {
      ...token,
    },
    components: {
      ...components,
    },
    algorithm:
      typeof algorithm === 'string'
        ? algorithmDefaultMapping[algorithm]
        : algorithm,
  };

  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
}

export default UIFrameworkConfigProvider;
