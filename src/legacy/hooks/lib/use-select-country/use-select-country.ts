import { IAppConfig, ICountry } from '@front-end/core';
import useAssets from '../use-assets/use-assets';
import useQuery from '../use-query/use-query';

interface DataInformationCountry {
  countrySupport?: [];
  list?: ICountry[];
}

export interface InformationCountry {
  data?: DataInformationCountry;
}

export function useSelectCountry(AppConfig: IAppConfig) {
  const getCountries = useAssets(AppConfig).getCountries();
  const { data } = useQuery<InformationCountry, ICountry[]>({
    queryKey: ['getCountries'],
    queryFn: () => fetch(`${getCountries}`).then((response) => response.json()),
    select: (data) => data?.data?.list || [],
  });

  return data;
}

export default useSelectCountry;
