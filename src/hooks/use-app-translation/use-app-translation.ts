import { useTranslation } from 'react-i18next';
import { TLanguageNS } from '@types';

export function useAppTranslation(namespace?: TLanguageNS) {
  const t = useTranslation(namespace);
  return t;
}

export default useAppTranslation;
