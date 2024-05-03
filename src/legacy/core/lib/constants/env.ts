import { getEnv } from '../utilities/utilities';

export const REACT_APP_BASE_API = getEnv()?.['REACT_APP_BASE_API'];
export const REACT_APP_STORAGE_ASSETS = getEnv()?.['REACT_APP_STORAGE_ASSETS'];
