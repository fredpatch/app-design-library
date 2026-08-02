import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../utils/cn';
import './switch.css';

export interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, 'asChild'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  invalid?: boolean;
  className?: string;
}

export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ id, label, description, invalid = false, disabled, className, ...props }, ref) => {
    const generatedId = React.useId();
    const controlId = id ?? generatedId;
    const descriptionId = description ? `${controlId}-description` : undefined;

    return (
      <label className={cn('fp-switch-field', className)} data-disabled={disabled ? 'true' : undefined}>
        <SwitchPrimitive.Root
          {...props}
          ref={ref}
          id={controlId}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={descriptionId}
          className="fp-switch"
        >
          <SwitchPrimitive.Thumb className="fp-switch__thumb" />
        </SwitchPrimitive.Root>

        {label || description ? (
          <span className="fp-switch-field__content">
            {label ? <span className="fp-switch-field__label">{label}</span> : null}
            {description ? (
              <span id={descriptionId} className="fp-switch-field__description">
                {description}
              </span>
            ) : null}
          </span>
        ) : null}
      </label>
    );
  },
);

Switch.displayName = 'Switch';
