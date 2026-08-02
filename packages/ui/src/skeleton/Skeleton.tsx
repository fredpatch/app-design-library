import * as React from 'react';
import { cn } from '../utils/cn';
import './skeleton.css';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  radius?: 'sm' | 'md' | 'lg' | 'full';
  animated?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, width, height, radius = 'md', animated = true, style, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('fp-skeleton', `fp-skeleton--${radius}`, animated && 'fp-skeleton--animated', className)}
      style={{ width, height, ...style }}
      {...props}
    />
  ),
);

Skeleton.displayName = 'Skeleton';
