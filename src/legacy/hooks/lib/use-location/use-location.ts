import { Location, useLocation as useCustomLocation } from 'react-router-dom';

export function useLocation(): Location {
  const location = useCustomLocation();

  return location;
}

export default useLocation;
