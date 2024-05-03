import { NavigateFunction, useNavigate as useNavigateCustom } from 'react-router-dom';

export interface UseNavigate {}

export function useNavigate(): NavigateFunction {
  const navigate = useNavigateCustom();
  return navigate;
}

export default useNavigate;
