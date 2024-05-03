import { ReactNode } from 'react';

import { useFieldArray, UseFieldArrayReturn, useFormContext } from 'react-hook-form';

export interface FormItemArrayProps {
  name: string;
  label?(props: UseFieldArrayReturn): ReactNode;
  required?: boolean;
  children?(props: UseFieldArrayReturn): ReactNode;
}

export function FormItemArray({ name = '', required = false, children, label }: FormItemArrayProps) {
  const { control } = useFormContext();
  const fieldArrayProps = useFieldArray({ control, name });

  return (
    <div>
      {label && label(fieldArrayProps)}
      {children && children(fieldArrayProps)}
    </div>
  );
}
