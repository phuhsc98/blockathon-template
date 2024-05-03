export enum EModalType {
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  DELETE_SUCCESS = 'DELETE_SUCCESS',
  UPDATE_SUCCESS = 'UPDATE_SUCCESS',
  CREATE_SUCCESS = 'CREATE_SUCCESS',
  CANCEL_FORM = 'CANCEL_FORM',
}

export interface IDefaultModal {
  open: boolean;
  title: string | React.ReactNode;
  id: string;
  cancelText?: string;
  okText?: string;
  width?: string | number;
  bodyStyle?: React.CSSProperties;
  type?: EModalType;
}

export enum ETabsKey {
  INFO = 'info',
  UPDATE_INFO = 'update-info',
}
