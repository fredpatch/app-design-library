import type * as React from 'react';
import type { Row, Table } from '@tanstack/react-table';
import type { Density } from '../index';

export interface DataTableProps<TData> {
  table: Table<TData>;
  loading?: boolean;
  loadingRowCount?: number;
  emptyState?: React.ReactNode;
  errorState?: React.ReactNode;
  onRowClick?: (row: Row<TData>) => void;
  getRowLabel?: (row: Row<TData>) => string;
  stickyHeader?: boolean;
  density?: 'inherit' | Density;
}
