import type * as React from 'react';

export interface FilterBarProps {
  search?: React.ReactNode;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  activeFilterCount?: number;
  onReset?: () => void;
  resetLabel?: string;
  collapsible?: boolean;
}
