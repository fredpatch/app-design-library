import type * as React from 'react';

export interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  metadata?: React.ReactNode;
  actions?: React.ReactNode;
  secondaryActions?: React.ReactNode;
  backAction?: React.ReactNode;
}
