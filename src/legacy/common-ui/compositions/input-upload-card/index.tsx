import { ReactNode, useMemo } from 'react';

import Upload from 'antd/es/upload';

import {
  EMINEType,
  IHtmlAttributes,
  IShowUploadList,
  noop,
} from '@front-end/core';

import {
  Icons,
  LoadingOutlinedIcon,
  Text,
  UploadOutlinedIcon,
} from '../../components';

// const DefaultLoadingIcon = <Icons component={LoadingOutlinedIcon} />;
// const DefaultUploadedIcon = <Icons component={UploadOutlinedIcon} />;

export interface InputUploadCardProps
  extends Omit<IHtmlAttributes, 'children'> {
  accept?: EMINEType[] | EMINEType;
  loading?: boolean;
  uploadText?: string;
  LoadingIcon?: ReactNode;
  UploadedIcon?: ReactNode;
  openFileDialogOnClick?: boolean;
  onClick?(): void;
  showUploadList?: boolean | IShowUploadList;
  disabled?: boolean;
  listType?: 'text' | 'picture' | 'picture-card' | 'picture-circle';
}

export function InputUploadCard({
  accept = EMINEType.Image,
  className,
  'data-testid': dataTestId,
  loading = false,
  uploadText = 'Đăng tải',
  LoadingIcon = <Icons component={LoadingOutlinedIcon} />,
  UploadedIcon = <Icons component={UploadOutlinedIcon} />,
  openFileDialogOnClick = true,
  onClick = noop,
  disabled = false,
  showUploadList = false,
  listType = 'picture-card',
}: InputUploadCardProps) {
  const acceptFile = useMemo(() => {
    if (typeof accept === 'string') {
      return accept;
    }
    return accept.join(',');
  }, [accept]);

  const passProps = {
    accept: acceptFile,
    className,
    openFileDialogOnClick,
    disabled,
    showUploadList,
    listType,
  };

  const uploadBtn = useMemo(
    () => (
      <div>
        {loading ? LoadingIcon : UploadedIcon}
        <div>
          <Text>{uploadText}</Text>
        </div>
      </div>
    ),
    [LoadingIcon, UploadedIcon, loading, uploadText]
  );

  return (
    <div onClick={onClick}>
      <Upload {...passProps} data-testid={dataTestId}>
        {uploadBtn}
      </Upload>
    </div>
  );
}
