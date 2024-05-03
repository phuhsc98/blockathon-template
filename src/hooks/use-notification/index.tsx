import { notification } from 'antd';
import { IconType, NotificationPlacement } from 'antd/es/notification/interface';

interface DivProps extends React.HTMLProps<HTMLDivElement> {
  'data-testid'?: string;
}

export interface INotificationProps {
  type?: 'success' | 'error' | 'info' | 'warning' | 'open' | 'Destroy';
  detail: {
    message: React.ReactNode;
    description?: React.ReactNode;
    btn?: React.ReactNode;
    key?: React.Key;
    onClose?: () => void;
    duration?: number | null;
    icon?: React.ReactNode;
    placement?: NotificationPlacement;
    style?: React.CSSProperties;
    className?: string;
    readonly type?: IconType;
    onClick?: () => void;
    closeIcon?: React.ReactNode;
    props?: DivProps;
  };
}

export function useNotification(props: INotificationProps) {
  const [api, contextHolder] = notification.useNotification();
  const { type = 'info', detail } = props;

  const openNotification = (placement: NotificationPlacement) => {
    api[type]({
      ...detail,
      placement,
    });
  };

  return { contextHolder, openNotification, api };
}
