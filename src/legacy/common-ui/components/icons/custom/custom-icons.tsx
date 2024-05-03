import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import Icon from '@ant-design/icons/lib/components/Icon';

const SoldSeatSvg = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line
      y1="-0.5"
      x2="19.1677"
      y2="-0.5"
      transform="matrix(0.730394 0.683026 -0.465542 0.885026 1.5 2)"
      stroke="currentColor"
    />
    <line
      y1="-0.5"
      x2="19.2245"
      y2="-0.5"
      transform="matrix(0.720401 -0.693558 0.476198 0.879338 0.650391 15.3333)"
      stroke="currentColor"
    />
    <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="currentColor" />
  </svg>
);

export const SoldSeatIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={SoldSeatSvg} {...props} />;
