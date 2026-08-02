import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, DatePicker, Select } from '@fredpatch/ui';
import { FilterBar } from './FilterBar';

const meta = {
  title: 'Patterns/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const statusOptions = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'en-cours', label: 'En cours' },
  { value: 'termine', label: 'Terminé' },
];

const phaseOptions = [
  { value: 'all', label: 'Toutes les phases' },
  { value: 'evaluation', label: 'Évaluation documentaire' },
  { value: 'inspection', label: 'Inspection' },
];

function Example({ collapsible = false }: { collapsible?: boolean }) {
  const [status, setStatus] = React.useState('en-cours');
  const [phase, setPhase] = React.useState('evaluation');
  const [date, setDate] = React.useState<Date>();
  const active =
    Number(status !== 'all') + Number(phase !== 'all') + Number(Boolean(date));

  return (
    <FilterBar
      search={
        <input
          aria-label="Rechercher"
          placeholder="Rechercher un dossier, un postulant…"
        />
      }
      filters={
        <>
          <Select
            ariaLabel="Statut"
            value={status}
            onValueChange={setStatus}
            options={statusOptions}
          />
          <Select
            ariaLabel="Phase"
            value={phase}
            onValueChange={setPhase}
            options={phaseOptions}
          />
          <DatePicker
            ariaLabel="Date de début"
            value={date}
            onChange={setDate}
            placeholder="Date de début"
          />
        </>
      }
      actions={<Button size="sm">Exporter</Button>}
      activeFilterCount={active}
      onReset={() => {
        setStatus('all');
        setPhase('all');
        setDate(undefined);
      }}
      collapsible={collapsible}
    />
  );
}

export const Default: Story = { render: () => <Example /> };
export const Collapsible: Story = { render: () => <Example collapsible /> };
export const SearchOnly: Story = {
  args: {
    search: (
      <input aria-label="Rechercher" placeholder="Rechercher dans la liste…" />
    ),
  },
};
export const NoActiveFilters: Story = {
  args: {
    search: <input aria-label="Rechercher" placeholder="Rechercher…" />,
    filters: (
      <Select ariaLabel="Statut" defaultValue="all" options={statusOptions} />
    ),
    activeFilterCount: 0,
  },
};
export const LongFrenchLabels: Story = {
  args: {
    search: (
      <input
        aria-label="Rechercher"
        placeholder="Rechercher par référence, raison sociale ou nom du postulant"
      />
    ),
    filters: (
      <Select
        ariaLabel="Type de procédure"
        defaultValue="certification"
        options={[
          {
            value: 'certification',
            label: 'Certification initiale d’un organisme de maintenance agréé',
          },
        ]}
      />
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
        <div
          key={theme}
          data-theme={theme}
          style={{ padding: 16, background: 'var(--surface-page)' }}
        >
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
