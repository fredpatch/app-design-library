import * as React from 'react';
import { cn } from '../utils/cn';
import './separator.css';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('fp-separator', `fp-separator--${orientation}`, className)}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      {...props}
    />
  ),
);

Separator.displayName = 'Separator';
