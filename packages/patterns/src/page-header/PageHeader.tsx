import * as React from 'react';
import type { PageHeaderProps } from './page-header.types';
import './page-header.css';

export function PageHeader({
  title,
  description,
  breadcrumbs,
  metadata,
  actions,
  secondaryActions,
  backAction,
}: PageHeaderProps) {
  return (
    <header className="fp-page-header">
      {breadcrumbs ? (
        <nav className="fp-page-header__breadcrumbs" aria-label="Fil d’Ariane">
          {breadcrumbs}
        </nav>
      ) : null}

      <div className="fp-page-header__main">
        <div className="fp-page-header__heading">
          {backAction ? (
            <div className="fp-page-header__back">{backAction}</div>
          ) : null}

          <div className="fp-page-header__copy">
            <div className="fp-page-header__title-row">
              <h1 className="fp-page-header__title">{title}</h1>
              {metadata ? (
                <div className="fp-page-header__metadata">{metadata}</div>
              ) : null}
            </div>

            {description ? (
              <p className="fp-page-header__description">{description}</p>
            ) : null}
          </div>
        </div>

        {actions ? (
          <div className="fp-page-header__actions">{actions}</div>
        ) : null}
      </div>

      {secondaryActions ? (
        <div className="fp-page-header__secondary-actions">
          {secondaryActions}
        </div>
      ) : null}
    </header>
  );
}
