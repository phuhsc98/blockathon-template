import { ListItemMetaProps } from 'antd/es/list';
import { styledComponent } from '../../styled/styled';
import { default as CustomListItemMeta } from './list-item-meta';

const StyledList = styledComponent((props)=><CustomListItemMeta {...props}/>)``;

export function ListItemMetaAntd(passProps: ListItemMetaProps) {
  return <StyledList {...passProps} />;
}

export default ListItemMetaAntd;
