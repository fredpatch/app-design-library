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
  onClick?: () => void;
  ariaLabel?: string;
}

export interface StatsGridProps {
  items: StatItem[];
  loading?: boolean;
  loadingRowCount?: number;
  loadingLabel?: string;
  columns?: 2 | 3 | 4;
}
