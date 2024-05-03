import { Image } from '@front-end/common-ui';
import { useAssets } from '@front-end/hooks';

export interface LogoProps {
  width?: number;
  height?: number;
  src?: string;
}

export function Logo({ width, height, src }: LogoProps) {
  return <Image width={width} height={height} preview={false} src={src} />;
}

export default Logo;
