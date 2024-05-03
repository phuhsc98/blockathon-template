import { IAppConfig, getEnvValue } from '@front-end/core';

export const appConfig: IAppConfig = {
  appName: getEnvValue('REACT_APP_APP_NAME'),
  storageAssetsPath: getEnvValue('REACT_APP_STORAGE_ASSETS_PATH'),
};

export const REACT_APP_PLAYLIST_FOLDER = process.env.REACT_APP_PLAYLIST_FOLDER;
export const REACT_APP_MEDIA_FOLDER = process.env.REACT_APP_MEDIA_FOLDER;
export const REACT_APP_STORAGE_URL = process.env.REACT_APP_STORAGE_URL;
export const REACT_APP_EVENT_FOLDER = process.env.REACT_APP_EVENT_FOLDER;
export const REACT_APP_ARTIST_FOLDER = process.env.REACT_APP_ARTIST_FOLDER;
export const REACT_APP_SPONSOR_FOLDER = process.env.REACT_APP_SPONSOR_FOLDER;

export const PARTNERSHIP_ID = getEnvValue('REACT_APP_PARTNERSHIP_ID');
export const WS_URL = getEnvValue('REACT_APP_WS_URL');

// export const PARTNERSHIP_CODE = getEnvValue('REACT_APP_PARTNERSHIP_CODE');
export const PARTNERSHIP_THEME_CODE = getEnvValue(
  'REACT_APP_PARTNERSHIP_THEME_CODE'
);
export const HIDE_SHOW_TOTAL_AVAILABLE = getEnvValue(
  'REACT_APP_HIDE_SHOW_TOTAL_AVAILABLE'
);

// export const LOGO_IMAGE = getEnvValue('REACT_APP_APP_LOGO');
