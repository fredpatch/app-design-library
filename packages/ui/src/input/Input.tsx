import * as React from 'react';
import { cn } from '../utils/cn';
import './input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: React.ReactNode;
  trailingAction?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leadingIcon, trailingAction, disabled, ...props }, ref) => (
    <span
      className="fp-input-shell"
      data-disabled={disabled ? 'true' : undefined}
    >
      {leadingIcon ? (
        <span className="fp-input-shell__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      <input
        ref={ref}
        className={cn('fp-input', className)}
        disabled={disabled}
        {...props}
      />
      {trailingAction ? (
        <span className="fp-input-shell__action">{trailingAction}</span>
      ) : null}
    </span>
  ),
);

Input.displayName = 'Input';
