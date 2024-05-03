import { styledComponent } from '../../styled/styled';
import { default as CustomModal } from './modal-antd';
import { ModalProps } from 'antd';

const StyledModal = styledComponent(CustomModal)`
  .ant-modal-content {
    max-height: 95vh;
    overflow: auto;
  }
`;
export function ModalAntd(props: ModalProps) {
  return (
    <StyledModal {...props}/>
  );
}