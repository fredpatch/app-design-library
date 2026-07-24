# V1 Component API Contracts

## Button

```ts
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'link';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  asChild?: boolean;
}
```

Acceptance points:

- loading prevents repeated activation;
- loading preserves width;
- icon-only usage requires an accessible label;
- navigation is composed through `asChild`;
- no business text is embedded.

## StatusBadge

```ts
export type StatusTone =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger';

export interface StatusBadgeProps {
  tone?: StatusTone;
  children: React.ReactNode;
  icon?: React.ReactNode;
  dot?: boolean;
  size?: 'sm' | 'md';
}
```

Acceptance points:

- meaning does not rely on color alone;
- component is non-interactive;
- applications map business states to tones.

## FormField

```ts
export interface FormFieldProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  children: React.ReactElement;
  className?: string;
}
```

Responsibilities:

- connect labels, descriptions, and errors;
- expose invalid state;
- preserve stable spacing;
- remain independent from React Hook Form.

## DataTable

```ts
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
```

Boundaries:

- receives an existing TanStack table instance;
- does not fetch data;
- does not own URL state;
- does not define business columns;
- does not implement exports or permissions.

## PageHeader

```ts
export interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  metadata?: React.ReactNode;
  actions?: React.ReactNode;
  secondaryActions?: React.ReactNode;
  backAction?: React.ReactNode;
}
```

## FilterBar

```ts
export interface FilterBarProps {
  search?: React.ReactNode;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  activeFilterCount?: number;
  onReset?: () => void;
  resetLabel?: string;
  collapsible?: boolean;
}
```

## StatsGrid

```ts
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
```

## EntityListPage

```ts
export interface EntityListPageProps {
  header: React.ReactNode;
  stats?: React.ReactNode;
  filters?: React.ReactNode;
  table: React.ReactNode;
  pagination?: React.ReactNode;
  notices?: React.ReactNode;
}
```

This component owns layout only.
