import {
  AppContext as CommonAppContext,
  CommonContextsProps,
} from '@front-end/common-ui';

import { PropsWithChildren } from 'react';
import { partnerTheme } from '../../theme/tokens';

import { initI18N } from '@front-end/core';

import { WS_URL, appConfig } from '@constants/app-config';
import { WebSocketContextProvider } from '@contexts/web-socket-context';

/* eslint-disable-next-line */
export interface AppClientContextProps extends CommonContextsProps {}

initI18N(appConfig, {});

export function AppClientContext({
  children,
  ...rest
}: PropsWithChildren<AppClientContextProps>) {
  return (
    <CommonAppContext
      components={partnerTheme.componentToken}
      themeTokens={partnerTheme.themeToken}
      themeAlgorithm='dark'
      {...rest}>
      <WebSocketContextProvider url={WS_URL}>
        {children}
      </WebSocketContextProvider>
    </CommonAppContext>
  );
}

export default AppClientContext;
