import type * as React from 'react';

export interface FormFieldProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  children: React.ReactElement;
  className?: string;
}
