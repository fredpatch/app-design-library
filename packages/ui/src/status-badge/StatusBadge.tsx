import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../utils/cn';
import type { StatusBadgeProps } from './status-badge.types';
import './status-badge.css';

const statusBadgeVariants = cva('fp-status-badge', {
  variants: {
    tone: {
      neutral: 'fp-status-badge--neutral',
      info: 'fp-status-badge--info',
      success: 'fp-status-badge--success',
      warning: 'fp-status-badge--warning',
      danger: 'fp-status-badge--danger',
    },
    size: {
      sm: 'fp-status-badge--sm',
      md: 'fp-status-badge--md',
    },
  },
  defaultVariants: {
    tone: 'neutral',
    size: 'md',
  },
});

export function StatusBadge({
  tone = 'neutral',
  size = 'md',
  icon,
  dot = false,
  children,
  className,
}: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ tone, size }), className)}>
      {dot ? <span className="fp-status-badge__dot" aria-hidden="true" /> : null}
      {icon ? (
        <span className="fp-status-badge__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="fp-status-badge__label">{children}</span>
    </span>
  );
}
