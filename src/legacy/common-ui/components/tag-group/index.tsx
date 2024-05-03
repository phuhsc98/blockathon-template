import { ReactNode } from 'react';

import {
  ESpaceAlign,
  ETagColorType,
  IHtmlAttributes,
  noarr,
} from '@front-end/core';
import { styledComponent } from '../../styled/styled';
import { useTheme } from '@emotion/react/macro';
import { Tag } from '../tag';
import { Container, Space } from '../../compositions';

export interface TagGroupProps extends IHtmlAttributes {
  items?: string[];
  icon?: ReactNode;
  color?: ETagColorType | string;
}

const StyledTagGroup = styledComponent(Container)`
  width: fit-content;
  padding: ${(props) => props.theme.paddingXS}px;
  background-color: ${(props) => props.theme.colorBgLayout};
`;

export function TagGroup({
  items = noarr,
  color,
  'data-testid': dataTestId,
  className,
  icon,
}: TagGroupProps) {
  const theme = useTheme();

  const passProps = { icon, className };

  return (
    <StyledTagGroup {...passProps} data-testid={dataTestId}>
      <Space size='small' align={ESpaceAlign.Center}>
        {icon}
        {items.map((tag, index) => (
          <Tag key={index} color={color}>
            {tag}
          </Tag>
        ))}
      </Space>
    </StyledTagGroup>
  );
}
