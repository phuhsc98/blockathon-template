import { EModalWidth, IHtmlAttributes } from '@front-end/core';
import { useTheme } from '@front-end/hooks';
import { ReactNode } from 'react';
import { styledComponent } from '../../styled/styled';
import { ButtonProps } from '../button';
import { default as CustomModal } from './modal';

export interface ModalProps extends IHtmlAttributes {
  afterClose?: () => any;
  autoFocusButton?: null | 'ok' | 'cancel';
  cancelText?: string;
  centered?: boolean;
  closable?: boolean;
  closeIcon?: ReactNode;
  content?: ReactNode;
  title?: ReactNode;
  width?: EModalWidth;
  zIndex?: number;
  onCancel?: () => any;
  onOk?: () => any;
  open?: boolean;
  cancelButtonProps?: ButtonProps;
  okButtonProps?: ButtonProps;
  footer?: ReactNode;
  destroyOnClose?: boolean;
}

const StyledModal = styledComponent(CustomModal)`
  .ant-modal-content {
    max-height: 95vh;
    overflow: auto;
  }
`;
export function Modal({
  afterClose,
  autoFocusButton = 'ok',
  cancelText = 'Cancel',
  centered = true,
  closable = true,
  closeIcon = undefined,
  content,
  title,
  width = EModalWidth.Medium,
  zIndex = 1000,
  onCancel,
  onOk,
  cancelButtonProps,
  okButtonProps,
  open,
  footer,
  children,
  'data-testid': dataTestId,
  className,
  destroyOnClose,
}: ModalProps) {
  const theme = useTheme();

  const passProps = {
    afterClose,
    autoFocusButton,
    cancelText,
    centered,
    closable,
    closeIcon,
    content,
    title,
    width: theme?.[width],
    zIndex,
    onCancel,
    onOk,
    open,
    cancelButtonProps,
    okButtonProps,
    footer,
    className,
    destroyOnClose,
  };

  return (
    <StyledModal {...passProps} data-testid={dataTestId}>
      {children}
    </StyledModal>
  );
}

export default Modal;
