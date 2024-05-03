import { cloneElement, memo, ReactNode } from 'react';

import { EBaseType, IHtmlAttributes } from '@front-end/core';
import {
  RegisterOptions,
  useController,
  useFormContext,
} from 'react-hook-form';

import { Flex, Text } from '../../components';
import {
  styledComponent,
  templateStringToClassName,
} from '../../styled/styled';
import Col from '../grid/col';
import Row from '../grid/row';

export interface FormItemProps extends IHtmlAttributes {
  addonAfter?: ReactNode;
  addonBefore?: ReactNode;
  col?: [number, number];
  gutter?: [number, number];
  items?: any[];
  label?: ReactNode;
  labelExtend?: ReactNode;
  name?: string;
  placeholder?: string;
  prefix?: ReactNode;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  isShowErrorMessage?: boolean;
  id?: string;
}

export const StyledItemContainer = styledComponent('div')`
  margin-bottom: ${(props: any) => props.theme.sizeXS}px;
`;

export function FormItem({
  'data-testid': dataTestId,
  addonAfter,
  addonBefore,
  children,
  col = [24, 24],
  gutter = [8, 8],
  items,
  label,
  labelExtend,
  name = '',
  placeholder,
  prefix,
  rules,
  isShowErrorMessage = true,
  id,
}: FormItemProps) {
  const { control } = useFormContext();
  const {
    field: { onChange, onBlur, name: _name, value, ref },
    fieldState: { isTouched, isDirty, error },
    formState: {
      // isDirty,
      touchedFields,
      dirtyFields,
      defaultValues,
      isSubmitted,
      isSubmitSuccessful,
      isSubmitting,
      submitCount,
      isValid,
      isValidating,
      errors,
    },
  } = useController({
    name,
    control,
    rules,
  });

  const passUiProps = {
    addonAfter,
    addonBefore,
    items,
    placeholder,
    prefix,
    'data-testid': dataTestId,
  };

  const passControlProps = { name, onBlur, onChange, value };

  return (
    <StyledItemContainer id={id}>
      <Row
        align='middle'
        gutter={gutter}
        className={templateStringToClassName()({
          position: 'relative',
        })}>
        {label && (
          <Col span={col[0]}>
            <Flex>
              {rules?.required && <Text type={EBaseType.Danger}>*</Text>}
              <label>{label}</label>
              {labelExtend}
            </Flex>
          </Col>
        )}
        <Col span={col[1]}>
          {children && cloneElement(children as any, { ...passControlProps })}
        </Col>
      </Row>
      {isShowErrorMessage && (
        <div
          className={templateStringToClassName()({
            position: 'absolute',
            bottom: '-10px',
            left: '12px',
          })}>
          {error && (
            <Text level={0} type={EBaseType.Danger}>
              {error.message}
            </Text>
          )}
        </div>
      )}
    </StyledItemContainer>
  );
}

export default memo(FormItem);
