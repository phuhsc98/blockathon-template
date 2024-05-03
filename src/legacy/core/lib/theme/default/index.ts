import { seedToken } from './seed-token';
import { mapToken } from './map-token';
import { aliasToken } from './alias-token';
import { customToken } from './custom-token';

export const defaultToken = {
  ...seedToken,
  ...mapToken,
  ...aliasToken,
  ...customToken,
};

export type TSeedToken = typeof seedToken;
export type TMapToken = typeof mapToken;
export type TAliasToken = typeof aliasToken;
export type ICustomToken = typeof customToken;
export type IDefaultToken = typeof defaultToken;

export { customToken };
