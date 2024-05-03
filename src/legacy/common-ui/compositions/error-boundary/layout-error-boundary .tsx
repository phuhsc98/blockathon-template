import { useRouteError } from 'react-router-dom';

export interface LayoutErrorBoundaryProps {}

export function LayoutErrorBoundary(_props: LayoutErrorBoundaryProps) {
  const error: any = useRouteError();

  return <div>{'Lỗi: ' + error?.message}</div>;
}

export default LayoutErrorBoundary;
