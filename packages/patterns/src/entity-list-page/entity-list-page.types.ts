import type * as React from 'react';

export interface EntityListPageProps {
  header: React.ReactNode;
  stats?: React.ReactNode;
  filters?: React.ReactNode;
  table: React.ReactNode;
  pagination?: React.ReactNode;
  notices?: React.ReactNode;
}
