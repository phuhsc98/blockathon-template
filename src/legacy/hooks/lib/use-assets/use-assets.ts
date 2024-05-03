import {
  IAppConfig,
  REACT_APP_STORAGE_ASSETS,
  STORAGE_ASSET_FONTS_PATH,
  STORAGE_ASSET_ICONS_PATH,
  STORAGE_ASSET_IMAGES_PATH,
} from '@front-end/core';
import { useRef } from 'react';

export interface UseAssetsProps {}

export interface UseAssets {
  getApp: (appPath?: string) => {
    getImages: (imageName?: string) => string;
  };
  getCountries: () => string;
}

export function useAssets(appConfig: IAppConfig): UseAssets {
  const baseUrlStorageAssets = useRef<string>(REACT_APP_STORAGE_ASSETS);

  const getCountries = () => {
    return `${baseUrlStorageAssets.current}/countries/countries.json`;
  };

  const getApp = (appPath = appConfig.storageAssetsPath) => {
    const path = `${baseUrlStorageAssets.current}/${
      appPath || appConfig.storageAssetsPath
    }`;

    return {
      getFonts: (fontName?: string) =>
        `${path}/${STORAGE_ASSET_FONTS_PATH}/${fontName}`,
      getIcons: (iconName?: string) =>
        `${path}/${STORAGE_ASSET_ICONS_PATH}/${iconName}`,
      getImages: (imageName?: string) =>
        `${path}/${STORAGE_ASSET_IMAGES_PATH}/${imageName}`,
    };
  };

  return { getApp, getCountries };
}

export default useAssets;
