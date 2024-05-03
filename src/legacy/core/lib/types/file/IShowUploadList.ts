import { IUploadFile } from './IUploadFile';

export interface IShowUploadList {
  showRemoveIcon?: boolean;
  showPreviewIcon?: boolean;
  showDownloadIcon?: boolean;
  removeIcon?: React.ReactNode | ((file: IUploadFile) => React.ReactNode);
  downloadIcon?: React.ReactNode | ((file: IUploadFile) => React.ReactNode);
  previewIcon?: React.ReactNode | ((file: IUploadFile) => React.ReactNode);
}
