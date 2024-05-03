import { ReactNode } from 'react';

import { default as CustomTag } from './tag';
import { ETagColorType, IHtmlAttributes } from '@front-end/core';
import { styledComponent } from '../../styled/styled';
import { useTheme } from '@emotion/react/macro';

export interface TagProps extends IHtmlAttributes {
  /**
   * Whether the Tag can be closed
   * @default false
   */
  closable?: boolean;
  /**
   * Custom close icon
   */
  closeIcon?: ReactNode;
  /**
   * Color of the Tag
   */
  color?: ETagColorType | string;
  /**
   * Set the icon of tag
   */
  icon?: ReactNode;
  /**
   * Callback executed when tag is closed
   */
  onClose?(e: React.MouseEvent<HTMLElement>): void;
}

const StyledTag = styledComponent(CustomTag)`
  cursor: default;
`;

export function Tag({
  'data-testid': dataTestId,
  children,
  className,
  closable = false,
  closeIcon,
  color,
  icon,
  onClose,
}: TagProps) {
  const theme = useTheme();
  const colored = (() => {
    switch (color) {
      case ETagColorType.Dark:
        return theme?.colorBgSpotlight;

      default:
        return color;
    }
  })();
  const passProps = {
    closable,
    closeIcon,
    color: colored,
    icon,
    onClose,
    className,
  };

  return (
    <StyledTag {...passProps} data-testid={dataTestId}>
      {children}
    </StyledTag>
  );
}
