import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import type { ButtonProps } from './button.types';
import './button.css';

const buttonVariants = cva('fp-button', {
  variants: {
    variant: {
      primary: 'fp-button--primary',
      secondary: 'fp-button--secondary',
      outline: 'fp-button--outline',
      ghost: 'fp-button--ghost',
      destructive: 'fp-button--destructive',
      link: 'fp-button--link',
    },
    size: {
      sm: 'fp-button--sm',
      md: 'fp-button--md',
      lg: 'fp-button--lg',
      icon: 'fp-button--icon',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      variant = 'primary',
      size = 'md',
      loading = false,
      leadingIcon,
      trailingIcon,
      disabled,
      children,
      className,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    return (
      <Component
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        aria-busy={loading || undefined}
        aria-disabled={asChild && isDisabled ? true : undefined}
        disabled={!asChild ? isDisabled : undefined}
        type={!asChild ? type : undefined}
        data-loading={loading ? 'true' : undefined}
        {...props}
      >
        <span className="fp-button__content" data-hidden={loading ? 'true' : undefined}>
          {leadingIcon ? <span className="fp-button__icon" aria-hidden="true">{leadingIcon}</span> : null}
          {children ? <span className="fp-button__label">{children}</span> : null}
          {trailingIcon ? <span className="fp-button__icon" aria-hidden="true">{trailingIcon}</span> : null}
        </span>
        {loading ? (
          <span className="fp-button__loader" aria-hidden="true">
            <span className="fp-button__spinner" />
          </span>
        ) : null}
      </Component>
    );
  },
);

Button.displayName = 'Button';
