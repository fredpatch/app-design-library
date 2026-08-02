import type { EntityListPageProps } from './entity-list-page.types';
import './entity-list-page.css';

export function EntityListPage({
  header,
  stats,
  notices,
  filters,
  table,
  pagination,
}: EntityListPageProps) {
  return (
    <main className="fp-entity-list-page">
      <section className="fp-entity-list-page__header">{header}</section>
      {notices ? <section className="fp-entity-list-page__notices" aria-label="Informations importantes">{notices}</section> : null}
      {stats ? <section className="fp-entity-list-page__stats" aria-label="Indicateurs">{stats}</section> : null}
      {filters ? <section className="fp-entity-list-page__filters" aria-label="Recherche et filtres">{filters}</section> : null}
      <section className="fp-entity-list-page__results" aria-label="Résultats">
        <div className="fp-entity-list-page__table">{table}</div>
        {pagination ? <footer className="fp-entity-list-page__pagination">{pagination}</footer> : null}
      </section>
    </main>
  );
}
