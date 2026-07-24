import type * as React from 'react';
import type { StatusTone } from '../index';

export interface StatusBadgeProps {
  tone?: StatusTone;
  children: React.ReactNode;
  icon?: React.ReactNode;
  dot?: boolean;
  size?: 'sm' | 'md';
}
