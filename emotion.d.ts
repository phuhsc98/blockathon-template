import { ITheme } from './src/legacy/core';
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme extends ITheme {}
}
