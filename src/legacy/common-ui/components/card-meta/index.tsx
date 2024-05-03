import { styledComponent } from '../../styled/styled';

import { default as CustomCardMeta } from './card-meta';
import { CardMetaProps } from 'antd/es/card';

const StyledCard = styledComponent(CustomCardMeta)``;

export function CardMeta(props: CardMetaProps) {
  return <StyledCard {...props} />;
}
