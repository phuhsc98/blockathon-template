import { ReactNode, useEffect } from 'react';
import {
  FormProvider as CustomFormProvider,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { Form } from '@front-end/common-ui';

export interface FormProviderProps<TFormValues extends FieldValues> {
  formMethods: UseFormReturn<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
  children?: ReactNode | ReactNode[];
  name?: string;
  id?: string;
}

export function FormProvider<
  TFormValues extends Record<string, any> = Record<string, any>
>({
  formMethods,
  onSubmit,
  children,
  name,
  id,
}: FormProviderProps<TFormValues>) {
  const { handleSubmit } = formMethods;

  return (
    <CustomFormProvider {...formMethods}>
      <Form id={id} key={name} onSubmit={handleSubmit(onSubmit)}>
        {children}
      </Form>
    </CustomFormProvider>
  );
}

export default FormProvider;
