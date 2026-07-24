import type * as React from 'react';
import type { StatusTone } from '@fredpatch/ui';

export interface StatItem {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
  description?: React.ReactNode;
  trend?: React.ReactNode;
  icon?: React.ReactNode;
  tone?: StatusTone;
}

export interface StatsGridProps {
  items: StatItem[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
}
