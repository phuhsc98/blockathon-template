import { styledComponent } from '../../styled/styled';
import { default as CustomTabs } from './tabs-antd';
import { TabsProps } from 'antd';

export const StyledTabsAntd = styledComponent(CustomTabs)``;

export function TabsAntd(props: TabsProps) {
  return <StyledTabsAntd {...props} />;
}

export default TabsAntd;
