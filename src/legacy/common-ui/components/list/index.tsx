import { ListProps } from 'antd';
import { styledComponent } from '../../styled/styled';
import { default as CustomList } from './list';

const StyledList = styledComponent((props)=><CustomList {...props}/>)``;

export function ListAntd<T>(passProps: ListProps<T>) {
  return <StyledList {...passProps} />;
}

export default ListAntd;
