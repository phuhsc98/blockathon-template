import { IHtmlAttributes } from '@front-end/core';
import {
  styledComponent,
  templateStringToClassName,
} from 'src/legacy/common-ui/styled/styled';

export interface AspectRatioProps extends IHtmlAttributes {
  ratio?: number;
  maxW?: string;
}

const StyledAspectRatio = styledComponent('div')``;

export function AspectRatio({
  ratio = 1,
  maxW = '100%',
  children,
}: AspectRatioProps) {
  return (
    <StyledAspectRatio
      className={templateStringToClassName()`
        max-width: ${maxW};
        aspect-ratio: ${ratio};

        & .ant-image {
          width: 100%;

          & img {
            aspect-ratio: ${ratio};
            width: 100%;
          }
        }

        & video {
          aspect-ratio: ${ratio};
          width: 100%;
        }
      `}>
      {children}
    </StyledAspectRatio>
  );
}

export default AspectRatio;
