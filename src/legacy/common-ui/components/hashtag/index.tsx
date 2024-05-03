import { IHtmlAttributes, noarr, noop, nostr } from '@front-end/core';
import { Space } from '../../compositions';

import { styledComponent } from '../../styled/styled';
import Link from '../typography/link';

const StyledHashTag = styledComponent('div')`
`;

export interface HashTagProps extends Omit<IHtmlAttributes, 'children'> {
  items?: string[];
  onClick?: (item?: string) => void;
}

export function HashTag({
  onClick = noop,
  items = noarr,
  'data-testid': dataTestId,
  className = nostr,
}: HashTagProps) {
  const passProps = { className };

  return (
    <StyledHashTag {...passProps} data-testid={dataTestId}>
      <Space size='small'>
        {items?.map((item) => (
          <Link key={item}>#{item} </Link>
        ))}
      </Space>
    </StyledHashTag>
  );
}
