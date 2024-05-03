import { useAssets } from '@front-end/hooks';
import { appConfig } from '@constants/app-config';

export function usePartnershipAssets() {
  const assets = useAssets(appConfig).getApp();
  return assets;
}
