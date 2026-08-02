import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '../utils/cn';
import './checkbox.css';

export interface CheckboxProps extends Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'children'
> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  invalid?: boolean;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, invalid, id, ...props }, ref) => {
  const generatedId = React.useId();
  const checkboxId = id ?? generatedId;
  const descriptionId = description ? `${checkboxId}-description` : undefined;

  return (
    <label
      className={cn('fp-checkbox-field', className)}
      data-disabled={props.disabled ? 'true' : undefined}
    >
      <CheckboxPrimitive.Root
        {...props}
        ref={ref}
        id={checkboxId}
        className="fp-checkbox"
        aria-invalid={invalid || undefined}
        aria-describedby={descriptionId}
      >
        <CheckboxPrimitive.Indicator className="fp-checkbox__indicator">
          {props.checked === 'indeterminate' ||
          props.defaultChecked === 'indeterminate' ? (
            <Minus aria-hidden="true" />
          ) : (
            <Check aria-hidden="true" />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {label || description ? (
        <span className="fp-checkbox-field__content">
          {label ? (
            <span className="fp-checkbox-field__label">{label}</span>
          ) : null}
          {description ? (
            <span id={descriptionId} className="fp-checkbox-field__description">
              {description}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
