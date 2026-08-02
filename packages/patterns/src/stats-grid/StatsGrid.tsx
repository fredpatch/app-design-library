import * as React from 'react';
import { StatusBadge } from '@fredpatch/ui';
import type { StatsGridProps } from './stats-grid.types';
import './stats-grid.css';

export function StatsGrid({
  items,
  loading = false,
  loadingRowCount,
  columns = 4,
  loadingLabel = 'Chargement des indicateurs',
}: StatsGridProps) {
  if (loading) {
    return (
      <div
        className="fp-stats-grid"
        data-columns={columns}
        aria-label={loadingLabel}
        aria-busy="true"
      >
        {Array.from({ length: loadingRowCount ?? columns }).map((_, index) => (
          <article
            className="fp-stat-card fp-stat-card--loading"
            key={index}
            aria-hidden="true"
          >
            <div className="fp-stat-card__inner">
              <span className="fp-stat-card__skeleton fp-stat-card__skeleton--label" />
              <span className="fp-stat-card__skeleton fp-stat-card__skeleton--value" />
              <span className="fp-stat-card__skeleton fp-stat-card__skeleton--description" />
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="fp-stats-grid" data-columns={columns}>
      {items.map((item) => {
        const content = (
          <div className="fp-stat-card__inner">
            <div className="fp-stat-card__header">
              <div className="fp-stat-card__label-group">
                {item.icon ? (
                  <span className="fp-stat-card__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                ) : null}
                <span className="fp-stat-card__label">{item.label}</span>
              </div>
              {item.trend ? (
                <StatusBadge tone={item.tone ?? 'neutral'} size="sm">
                  {item.trend}
                </StatusBadge>
              ) : null}
            </div>
            <div className="fp-stat-card__value">{item.value}</div>
            {item.description ? (
              <div className="fp-stat-card__description">
                {item.description}
              </div>
            ) : null}
          </div>
        );

        return item.onClick ? (
          <button
            key={item.id}
            type="button"
            className="fp-stat-card fp-stat-card--interactive"
            onClick={item.onClick}
            aria-label={item.ariaLabel}
          >
            {content}
          </button>
        ) : (
          <article key={item.id} className="fp-stat-card">
            {content}
          </article>
        );
      })}
    </div>
  );
}
