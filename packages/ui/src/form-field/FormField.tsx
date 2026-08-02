import * as React from 'react';
import { cn } from '../utils/cn';
import type { FormFieldProps } from './form-field.types';
import './form-field.css';

export function FormField({
  label,
  description,
  error,
  required = false,
  disabled = false,
  children,
  className,
}: FormFieldProps) {
  const generatedId = React.useId();
  const childProps = children.props as React.HTMLAttributes<HTMLElement> & {
    id?: string;
    disabled?: boolean;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
  };

  const controlId = childProps.id ?? `fp-field-${generatedId}`;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const describedBy = [childProps['aria-describedby'], descriptionId, errorId]
    .filter(Boolean)
    .join(' ') || undefined;

  const control = React.cloneElement(children, {
    id: controlId,
    disabled: childProps.disabled ?? disabled,
    'aria-describedby': describedBy,
    'aria-invalid': error ? true : childProps['aria-invalid'],
    'aria-required': required || childProps['aria-required'] || undefined,
  });

  return (
    <div
      className={cn('fp-form-field', className)}
      data-disabled={disabled ? 'true' : undefined}
      data-invalid={error ? 'true' : undefined}
    >
      {label ? (
        <label className="fp-form-field__label" htmlFor={controlId}>
          <span>{label}</span>
          {required ? (
            <span className="fp-form-field__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div className="fp-form-field__control">{control}</div>

      {description ? (
        <div className="fp-form-field__description" id={descriptionId}>
          {description}
        </div>
      ) : null}

      {error ? (
        <div className="fp-form-field__error" id={errorId} role="alert">
          {error}
        </div>
      ) : null}
    </div>
  );
}
