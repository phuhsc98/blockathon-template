import { ListItemProps } from 'antd/es/list';
import { styledComponent } from '../../styled/styled';
import { default as CustomListItem } from './list-item';

const StyledList = styledComponent((props)=><CustomListItem {...props}/>)``;

export function ListItemAntd(passProps: ListItemProps) {
  return <StyledList {...passProps} />;
}

export default ListItemAntd;
