import { memo, ReactNode } from 'react';

import { EBaseType, IHtmlAttributes } from '@front-end/core';

import { Col, Row } from '../../compositions';

import Flex from '../flex';
import Text from '../typography/text';

interface FormItemProps extends IHtmlAttributes {
  col?: [number, number];
  gutter?: [number, number];
  label?: ReactNode;
  labelExtend?: ReactNode;
  isRequired?: boolean;
}

export function FormWithLabel({
  children,
  col = [24, 24],
  gutter = [8, 8],
  label,
  labelExtend,
  isRequired,
}: FormItemProps) {
  return (
    <Row align='middle' gutter={gutter}>
      {label && (
        <Col span={col[0]}>
          <Flex>
            {isRequired && <Text type={EBaseType.Danger}>*</Text>}
            <label>{label}</label>
            {labelExtend}
          </Flex>
        </Col>
      )}
      <Col className='content' span={col[1]}>
        {children}
      </Col>
    </Row>
  );
}

export default memo(FormWithLabel);
