import { noobj } from '@front-end/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MapToken, OverrideToken } from 'antd/es/theme/interface';
import { SeedToken } from 'antd/es/theme/internal';
import { ReactNode, StrictMode, useMemo } from 'react';
import { AppErrorBoundary, Suspense } from '../../compositions';
import GlobalStyle from '../../compositions/global-style';
import ThemeContext from '../theme-context/theme-context';

export interface CommonContextsProps {
  onChange?: () => undefined;
  themeAlgorithm?:
    | ((token: SeedToken) => MapToken)
    | 'default'
    | 'dark'
    | 'compact';
  themeTokens?: object;
  components?: OverrideToken;
  value?: boolean;
  children?: ReactNode;
}

const queryClient = new QueryClient();

export function AppContext({
  themeTokens = noobj,
  themeAlgorithm,
  components = noobj,
  children,
}: CommonContextsProps) {
  const globalStyleMemo = useMemo(() => <GlobalStyle />, []);
  return (
    // <StrictMode>
    <AppErrorBoundary>
      <ThemeContext
        token={themeTokens}
        algorithm={themeAlgorithm}
        components={components}>
        <Suspense>
          <QueryClientProvider client={queryClient}>
            {globalStyleMemo}
            {children}
          </QueryClientProvider>
        </Suspense>
      </ThemeContext>
    </AppErrorBoundary>
    // </StrictMode>
  );
}

export default AppContext;
