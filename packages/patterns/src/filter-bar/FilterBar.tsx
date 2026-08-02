import * as React from 'react';
import { Button } from '@fredpatch/ui';
import type { FilterBarProps } from './filter-bar.types';
import './filter-bar.css';

export function FilterBar({
  search,
  filters,
  actions,
  activeFilterCount = 0,
  onReset,
  resetLabel = 'Réinitialiser',
  collapsible = false,
}: FilterBarProps) {
  const [expanded, setExpanded] = React.useState(!collapsible);
  const hasFilters = Boolean(filters);

  return (
    <section className="fp-filter-bar" aria-label="Filtres de la liste">
      <div className="fp-filter-bar__primary">
        {search ? <div className="fp-filter-bar__search">{search}</div> : null}

        <div className="fp-filter-bar__controls">
          {collapsible && hasFilters ? (
            <Button
              variant="outline"
              size="sm"
              aria-expanded={expanded}
              aria-controls="fp-filter-bar-filters"
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? 'Masquer les filtres' : 'Afficher les filtres'}
              {activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </Button>
          ) : null}

          {activeFilterCount > 0 && onReset ? (
            <Button variant="ghost" size="sm" onClick={onReset}>
              {resetLabel}
            </Button>
          ) : null}

          {actions ? (
            <div className="fp-filter-bar__actions">{actions}</div>
          ) : null}
        </div>
      </div>

      {hasFilters && (!collapsible || expanded) ? (
        <div id="fp-filter-bar-filters" className="fp-filter-bar__filters">
          {filters}
        </div>
      ) : null}

      {activeFilterCount > 0 ? (
        <div className="fp-filter-bar__summary" aria-live="polite">
          {activeFilterCount} filtre{activeFilterCount > 1 ? 's' : ''} actif
          {activeFilterCount > 1 ? 's' : ''}
        </div>
      ) : null}
    </section>
  );
}
