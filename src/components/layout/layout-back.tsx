/* eslint-disable @typescript-eslint/no-empty-interface */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, ButtonProps, styledComponent } from '@front-end/common-ui';

import { PropsWithChildren, ReactNode } from 'react';
interface BottomActionProps extends ButtonProps {
  //
}

type Props = {
  title: string;
  footer?: ReactNode;
  handleBack: () => void;
};

const LayoutStyled = styledComponent('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  background: theme.colorBgLayout,
  height: '100vh',
  color: theme.colorTextHeading,
}));

const HeaderStyled = styledComponent('header')(({ theme }) => ({
  height: '56px',
  boxShadow: theme.boxShadow,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.paddingContentHorizontalLG,
  flexShrink: 0,
  background: theme.colorBgContainer,
  fontSize: theme.size,
  fontFamily: theme.fontFamily,
  fontWeight: 500,
  color: '#fafafa',
  borderBottom: '1px solid #1F1F1F',
}));

const ContentStyled = styledComponent('main')(({ theme }) => ({
  flexGrow: 1,
}));

const BottomActionStyled = styledComponent('footer')(({ theme }) => ({
  padding: theme.paddingContentHorizontal,
  borderTop: '1px solid #1F1F1F',
}));

function LayoutBack({
  children,
  title,
  footer,
  handleBack,
}: PropsWithChildren<Props>) {
  return (
    <LayoutStyled>
      <HeaderStyled>
        <ArrowLeftOutlined
          style={{
            fontSize: 24,
          }}
          onClick={handleBack}
        />
        <div>{title}</div>
        <span style={{ width: 24 }}></span>
      </HeaderStyled>
      <ContentStyled>{children}</ContentStyled>
      <BottomActionStyled>{footer}</BottomActionStyled>
    </LayoutStyled>
  );
}

const IconButtonStyled = styledComponent(Button)(({ theme }) => ({
  borderRadius: theme.borderRadiusLG,
  fontWeight: 500,
}));

function BottomAction({
  children,
  ...rest
}: PropsWithChildren<BottomActionProps>) {
  return <IconButtonStyled {...rest}>{children}</IconButtonStyled>;
}

LayoutBack.Action = BottomAction;

export { LayoutBack };
export default LayoutBack;
