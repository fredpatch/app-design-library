# V1 Implementation Sequence

## Stage 1 — Foundation validation

1. Install dependencies.
2. Start Storybook.
3. Validate theme switching.
4. Validate light/dark mode.
5. Validate all density modes.
6. Correct incomplete semantic tokens.

Exit criteria:

- no missing CSS variable in the initial themes;
- Storybook toolbar updates the document attributes;
- base page remains readable under every theme and density.

## Stage 2 — Button

Implement only Button and its stories.

Review criteria:

- API matches `V1-COMPONENT-APIS.md`;
- semantic tokens only;
- keyboard focus visible;
- loading behavior stable;
- Prestix and ANAC examples validated.

## Stage 3 — StatusBadge

Implement StatusBadge after Button API is accepted.

## Stage 4 — FormField

Consolidate Prestix field patterns without coupling to React Hook Form.

## Stage 5 — DataTable

Compare Prestix and SICOT table behavior before implementation.

Required design decisions:

- table primitives versus TanStack wrapper;
- pagination ownership;
- row-click accessibility;
- empty and error rendering;
- horizontal overflow;
- sticky header behavior.

## Stage 6 — Structural patterns

Implement in this order:

1. PageHeader
2. FilterBar
3. StatsGrid
4. EntityListPage

## Stage 7 — Consumer validation

Prestix pilot:

- Button
- StatusBadge
- PageHeader

SICOT pilot:

- Button
- StatusBadge
- PageHeader
- FilterBar

Do not begin broader migration before both pilots pass.
