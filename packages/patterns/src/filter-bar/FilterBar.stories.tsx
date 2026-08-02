import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@fredpatch/ui';
import { FilterBar } from './FilterBar';

const meta = {
  title: 'Patterns/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example({ collapsible = false }: { collapsible?: boolean }) {
  const [active, setActive] = React.useState(2);

  return (
    <FilterBar
      search={<input aria-label="Rechercher" placeholder="Rechercher un dossier, un postulant…" />}
      filters={
        <>
          <select aria-label="Statut" defaultValue="en-cours">
            <option value="">Tous les statuts</option>
            <option value="en-cours">En cours</option>
            <option value="termine">Terminé</option>
          </select>
          <select aria-label="Phase" defaultValue="evaluation">
            <option value="">Toutes les phases</option>
            <option value="evaluation">Évaluation documentaire</option>
            <option value="inspection">Inspection</option>
          </select>
          <input type="date" aria-label="Date de début" />
        </>
      }
      actions={<Button size="sm">Exporter</Button>}
      activeFilterCount={active}
      onReset={() => setActive(0)}
      collapsible={collapsible}
    />
  );
}

export const Default: Story = { render: () => <Example /> };
export const Collapsible: Story = { render: () => <Example collapsible /> };
export const SearchOnly: Story = {
  args: {
    search: <input aria-label="Rechercher" placeholder="Rechercher dans la liste…" />,
  },
};
export const NoActiveFilters: Story = {
  args: {
    search: <input aria-label="Rechercher" placeholder="Rechercher…" />,
    filters: <select aria-label="Statut"><option>Tous les statuts</option></select>,
    activeFilterCount: 0,
  },
};
export const LongFrenchLabels: Story = {
  args: {
    search: <input aria-label="Rechercher" placeholder="Rechercher par référence, raison sociale ou nom du postulant" />,
    filters: (
      <select aria-label="Type de procédure">
        <option>Certification initiale d’un organisme de maintenance agréé</option>
      </select>
    ),
    activeFilterCount: 1,
    onReset: () => undefined,
    resetLabel: 'Effacer tous les critères appliqués',
  },
};

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      {(['neutral', 'prestix', 'anac-institutional'] as const).map((theme) => (
        <div key={theme} data-theme={theme} style={{ padding: 16, background: 'var(--surface-page)' }}>
          <Example />
        </div>
      ))}
    </div>
  ),
};

export const DensityComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      {(['comfortable', 'compact', 'dense'] as const).map((density) => (
        <div key={density} data-density={density}>
          <Example />
        </div>
      ))}
    </div>
  ),
};
