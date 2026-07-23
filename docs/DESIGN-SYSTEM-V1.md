# Application Design Library — V1 Specification

## 1. Objective

Create a reusable design library for Fredpatch applications built with:

- React
- TypeScript
- Tailwind CSS 4
- shadcn-compatible primitives
- Radix UI or Base UI
- TanStack Table
- React Hook Form
- Lucide

The library must allow applications to reuse the same structural components while preserving their own branding, density and business vocabulary.

The first consumers are:

- Prestix
- SICOT

Prestix provides the primary reference for semantic tokens and dark themes.

SICOT provides the primary reference for dense administrative interfaces, tables and filter-heavy pages.

---

# 2. Design principles

## 2.1 Semantic styling

Components must consume semantic roles rather than physical colors.

Correct:

```css
background: var(--surface-card);
color: var(--text-primary);
border-color: var(--border-default);
```

Incorrect:

```css
background: #ffffff;
color: #1a2340;
border-color: #d1d9e6;
```

Application-specific colors belong in themes.

---

## 2.2 Business independence

Library components must not contain:

- API calls;
- query hooks;
- permission checks;
- route definitions;
- business entity types;
- business status values;
- application names;
- hard-coded business actions.

Applications provide these concerns through props and composition.

---

## 2.3 Composition before configuration

Prefer slots and composition rather than large configuration objects.

Preferred:

```tsx
<PageHeader title="Factures" actions={<CreateInvoiceButton />} />
```

Avoid a generic page renderer accepting hundreds of configuration fields.

---

## 2.4 Accessible by default

Every interactive component must provide:

- keyboard navigation;
- visible focus;
- accessible names;
- disabled behavior;
- loading behavior where relevant;
- sufficient contrast;
- proper label and error associations.

---

## 2.5 Density as a first-class feature

The library supports three density modes:

```ts
type Density = "comfortable" | "compact" | "dense";
```

Recommended consumers:

```text
Prestix: dense
SICOT: compact
Public-facing applications: comfortable
```

Density may change:

- component height;
- horizontal padding;
- vertical padding;
- table row height;
- spacing between controls;
- default text size.

Density must not alter:

- accessibility;
- semantic hierarchy;
- focus size;
- status meaning.

---

# 3. Package architecture

```text
packages/
├─ tokens/
├─ themes/
├─ ui/
├─ patterns/
└─ prompts/
```

## `@fredpatch/design-tokens`

Contains:

- CSS custom properties;
- density definitions;
- typography scales;
- radius scales;
- motion values;
- status roles.

It must not depend on React.

## `@fredpatch/design-themes`

Contains application branding:

- neutral;
- prestix;
- anac-institutional;
- dark-teal.

It depends on design tokens only.

## `@fredpatch/ui`

Contains generic React UI components:

- Button;
- StatusBadge;
- FormField;
- DataTable.

It may depend on:

- React;
- CVA;
- Radix or Base UI;
- TanStack Table;
- design tokens.

It must not depend on React Router, Axios or TanStack Query.

## `@fredpatch/patterns`

Contains composed interface patterns:

- PageHeader;
- FilterBar;
- StatsGrid;
- EntityListPage.

It depends on `@fredpatch/ui`.

## `@fredpatch/design-prompts`

Contains Markdown prompts and design instructions.

It contains no runtime code.

---

# 4. Semantic token contract

## 4.1 Surface tokens

```css
--surface-page;
--surface-card;
--surface-popover;
--surface-muted;
--surface-subtle;
--surface-emphasis;
--surface-overlay;
```

Usage:

| Token              | Purpose                                |
| ------------------ | -------------------------------------- |
| `surface-page`     | Main application background            |
| `surface-card`     | Cards and panels                       |
| `surface-popover`  | Menus, popovers and dialogs            |
| `surface-muted`    | Secondary panels                       |
| `surface-subtle`   | Hover or selected-row backgrounds      |
| `surface-emphasis` | Strong navigation or highlighted areas |
| `surface-overlay`  | Dialog overlay                         |

---

## 4.2 Text tokens

```css
--text-primary;
--text-secondary;
--text-muted;
--text-subtle;
--text-inverse;
--text-link;
--text-disabled;
```

No component may use raw neutral text colors.

---

## 4.3 Border tokens

```css
--border-default;
--border-subtle;
--border-strong;
--border-focus;
--border-disabled;
```

---

## 4.4 Interactive tokens

```css
--interactive-primary;
--interactive-primary-hover;
--interactive-primary-active;
--interactive-primary-foreground;

--interactive-secondary;
--interactive-secondary-hover;
--interactive-secondary-foreground;

--interactive-destructive;
--interactive-destructive-hover;
--interactive-destructive-foreground;
```

---

## 4.5 Status tokens

Each status has background, border and text roles.

```css
--status-neutral-bg;
--status-neutral-border;
--status-neutral-text;

--status-info-bg;
--status-info-border;
--status-info-text;

--status-success-bg;
--status-success-border;
--status-success-text;

--status-warning-bg;
--status-warning-border;
--status-warning-text;

--status-danger-bg;
--status-danger-border;
--status-danger-text;
```

Applications map domain statuses to tones.

Example:

```ts
const invoiceTone = {
  draft: "neutral",
  sent: "info",
  paid: "success",
  overdue: "warning",
  cancelled: "danger",
} as const;
```

The mapping remains inside the application.

---

## 4.6 Typography tokens

```css
--font-body;
--font-heading;
--font-mono;

--text-xs;
--text-sm;
--text-base;
--text-lg;
--text-xl;
--text-2xl;

--line-height-tight;
--line-height-normal;
--line-height-relaxed;

--font-weight-normal;
--font-weight-medium;
--font-weight-semibold;
--font-weight-bold;
```

The library must use a normal `16px` browser root.

Prestix density must be recreated through component tokens rather than an `11px` root font size.

---

## 4.7 Spacing and density

```css
--control-height-sm;
--control-height-md;
--control-height-lg;

--control-padding-x;
--control-padding-y;

--layout-gap-xs;
--layout-gap-sm;
--layout-gap-md;
--layout-gap-lg;
--layout-gap-xl;

--table-row-height;
--table-cell-padding-x;
--table-cell-padding-y;
```

Density is activated through a data attribute:

```html
<html data-density="compact"></html>
```

Example:

```css
[data-density="comfortable"] {
  --control-height-md: 2.75rem;
  --table-row-height: 3.25rem;
}

[data-density="compact"] {
  --control-height-md: 2.375rem;
  --table-row-height: 2.75rem;
}

[data-density="dense"] {
  --control-height-md: 2rem;
  --table-row-height: 2.375rem;
}
```

---

## 4.8 Radius tokens

```css
--radius-sm;
--radius-md;
--radius-lg;
--radius-xl;
--radius-full;
```

---

## 4.9 Shadow tokens

```css
--shadow-sm;
--shadow-md;
--shadow-lg;
--shadow-dialog;
```

Shadows should remain subtle in administrative applications.

---

## 4.10 Motion tokens

```css
--duration-fast;
--duration-normal;
--duration-slow;

--ease-standard;
--ease-enter;
--ease-exit;
```

Animations must respect reduced-motion preferences.

---

# 5. Theme contract

A theme must assign values to all required semantic tokens.

Themes must not redefine component selectors.

Correct:

```css
[data-theme="prestix"] {
  --interactive-primary: #a77800;
  --surface-page: #ffffff;
}
```

Incorrect:

```css
[data-theme="prestix"] .button {
  background: #a77800;
}
```

Initial themes:

## Neutral

Purpose:

- Storybook default;
- prototypes;
- future applications without established branding.

## Prestix

Characteristics:

- gold primary accent;
- Plus Jakarta Sans;
- dense business interface;
- optional dark teal mode.

## ANAC Institutional

Characteristics:

- navy primary;
- institutional blue accents;
- Geist;
- compact administrative density;
- clear table separation.

## Dark Teal

Purpose:

- shared dark surface palette;
- usable independently from Prestix branding.

Theme and light/dark mode must remain separate concepts.

Example:

```html
<html data-theme="prestix" data-mode="dark" data-density="dense"></html>
```

---

# 6. Public component APIs

## 6.1 Button

### Purpose

Trigger an application action.

### API

```ts
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";

type ButtonSize = "sm" | "md" | "lg" | "icon";
```

Required capabilities:

```tsx
<Button variant="primary">
  Enregistrer
</Button>

<Button loading>
  Enregistrement
</Button>

<Button leadingIcon={<Plus />}>
  Ajouter
</Button>
```

### Props

```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  asChild?: boolean;
}
```

### Rules

- Loading disables repeated activation.
- Loading state preserves the button width.
- Icon-only buttons require an accessible label.
- Buttons do not perform navigation internally.
- Applications may compose them with router links through `asChild`.

---

## 6.2 StatusBadge

### Purpose

Display a compact semantic state.

### API

```ts
type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";
```

```ts
interface StatusBadgeProps {
  tone?: StatusTone;
  children: React.ReactNode;
  icon?: React.ReactNode;
  dot?: boolean;
  size?: "sm" | "md";
}
```

Example:

```tsx
<StatusBadge tone="success">Payée</StatusBadge>
```

### Rules

- Business status names are not defined by the library.
- Meaning must not rely only on color.
- The badge must not trigger actions.
- Interactive status controls require a separate component.

---

## 6.3 FormField

### Purpose

Provide consistent label, description and error relationships.

### API

```ts
interface FormFieldProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  children: React.ReactElement;
  className?: string;
}
```

Example:

```tsx
<FormField
  label="Adresse e-mail"
  description="Utilisée pour les notifications."
  error={errors.email?.message}
  required
>
  <Input {...register("email")} />
</FormField>
```

### Responsibilities

- generate stable IDs;
- connect label and control;
- connect descriptions with `aria-describedby`;
- expose invalid state;
- keep error spacing stable.

### Non-responsibilities

- React Hook Form registration;
- schema validation;
- business validation messages;
- API errors.

---

## 6.4 DataTable

### Purpose

Render generic tabular data using TanStack Table.

### API direction

```ts
interface DataTableProps<TData> {
  table: Table<TData>;
  loading?: boolean;
  loadingRowCount?: number;
  emptyState?: React.ReactNode;
  errorState?: React.ReactNode;
  onRowClick?: (row: Row<TData>) => void;
  getRowLabel?: (row: Row<TData>) => string;
  stickyHeader?: boolean;
  density?: "inherit" | Density;
}
```

### Important boundary

`DataTable` receives an already-configured TanStack table instance.

The library does not own:

- server pagination;
- queries;
- URL filters;
- domain column definitions;
- permission-based actions;
- exporting.

### Required states

- populated;
- loading;
- empty;
- error;
- selected rows;
- horizontal overflow.

---

# 7. Pattern APIs

## 7.1 PageHeader

### Purpose

Provide consistent page hierarchy and actions.

```ts
interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  metadata?: React.ReactNode;
  actions?: React.ReactNode;
  secondaryActions?: React.ReactNode;
  backAction?: React.ReactNode;
}
```

Example:

```tsx
<PageHeader
  title="Factures"
  description="Suivi des factures émises."
  actions={<Button>Nouvelle facture</Button>}
/>
```

### Responsive behavior

- actions wrap below the heading;
- primary action remains visible;
- secondary actions may move into an overflow menu.

---

## 7.2 FilterBar

### Purpose

Compose search, structured filters and list actions.

```ts
interface FilterBarProps {
  search?: React.ReactNode;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  activeFilterCount?: number;
  onReset?: () => void;
  resetLabel?: string;
  collapsible?: boolean;
}
```

Example:

```tsx
<FilterBar
  search={<SearchInput />}
  filters={
    <>
      <StatusFilter />
      <DateRangeFilter />
    </>
  }
  activeFilterCount={2}
  onReset={resetFilters}
/>
```

### Rules

- The library does not know filter values.
- The library does not synchronize query parameters.
- Filters remain controlled by the application.
- On mobile, structured filters may open in a sheet.

---

## 7.3 StatsGrid

### Purpose

Display a responsive group of summary metrics.

```ts
interface StatItem {
  id: string;
  label: React.ReactNode;
  value: React.ReactNode;
  description?: React.ReactNode;
  trend?: React.ReactNode;
  icon?: React.ReactNode;
  tone?: StatusTone;
}

interface StatsGridProps {
  items: StatItem[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
}
```

### Rules

- StatsGrid handles arrangement.
- Applications calculate values and trends.
- Color cannot be the only trend indicator.
- Long values must not break the card layout.

---

## 7.4 EntityListPage

### Purpose

Provide a reusable administration list structure.

```ts
interface EntityListPageProps {
  header: React.ReactNode;
  stats?: React.ReactNode;
  filters?: React.ReactNode;
  table: React.ReactNode;
  pagination?: React.ReactNode;
  notices?: React.ReactNode;
}
```

Composition:

```tsx
<EntityListPage
  header={<PageHeader />}
  stats={<StatsGrid />}
  filters={<FilterBar />}
  table={<DataTable />}
  pagination={<DataTablePagination />}
/>
```

### Rules

- No fetching logic.
- No router logic.
- No entity terminology.
- No built-in create action.
- Layout only.

---

# 8. V1 acceptance criteria

A component is complete only when:

- it uses semantic tokens;
- it renders under every initial theme;
- it works in light and dark modes where supported;
- it works under all density modes;
- it has Storybook stories;
- it exposes loading and disabled states where relevant;
- keyboard behavior is validated;
- visible focus is present;
- no application imports exist;
- no raw brand colors exist;
- public props have TypeScript documentation;
- a usage example exists for Prestix;
- a usage example exists for SICOT.

---

# 9. Storybook requirements

Each component must include stories for:

```text
Default
Variants
Sizes
Disabled
Loading
Long content
Dark mode
Compact density
Dense density
Prestix theme
ANAC Institutional theme
```

Patterns must additionally include:

```text
Empty
Error
Mobile
Many actions
Long French labels
```

---

# 10. Prompt library requirements

Each reusable pattern receives:

```text
README.md
generate.prompt.md
adapt.prompt.md
review.prompt.md
```

The adaptation prompt must instruct the AI to:

1. inspect the target project;
2. identify reusable existing components;
3. avoid duplicate implementations;
4. map business states to semantic tones;
5. preserve application theme;
6. report proposed file changes;
7. wait for approval before implementation.

---

# 11. V1 implementation order

## Foundation

1. Workspace configuration
2. Tokens package
3. Theme package
4. Storybook theme and density toolbar

## Components

5. Button
6. StatusBadge
7. FormField
8. DataTable

## Patterns

9. PageHeader
10. FilterBar
11. StatsGrid
12. EntityListPage

## Validation

13. Prestix example stories
14. SICOT example stories
15. Accessibility review
16. API stabilization
17. First package version

---

# 12. Explicit non-goals for V1

V1 will not include:

- application authentication;
- routing;
- authorization;
- API clients;
- React Query abstractions;
- charts;
- document editors;
- workflow engines;
- application-specific forms;
- public website components;
- mobile-native components;
- complete Prestix or SICOT page migrations.

These can be evaluated after the first cross-project integration succeeds.
