import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { ClipboardList, FileCheck2, Plus, Search, TimerReset } from 'lucide-react';
import { Button, DataTable, DatePicker, Input, Select, StatusBadge } from '@fredpatch/ui';
import { FilterBar } from '../filter-bar/FilterBar';
import { PageHeader } from '../page-header/PageHeader';
import { StatsGrid } from '../stats-grid/StatsGrid';
import { EntityListPage } from './EntityListPage';

type Dossier = {
  reference: string;
  postulant: string;
  phase: string;
  status: 'En cours' | 'À corriger' | 'Validé';
  updatedAt: string;
};

const dossiers: Dossier[] = [
  { reference: 'OMA-2026-014', postulant: 'Air Service Gabon', phase: 'Évaluation documentaire', status: 'En cours', updatedAt: '30/07/2026' },
  { reference: 'OMA-2026-009', postulant: 'Afrijet Business Service', phase: 'Demande formelle', status: 'À corriger', updatedAt: '28/07/2026' },
  { reference: 'OMA-2026-005', postulant: 'Gabon Aero Solutions', phase: 'Phase préliminaire', status: 'Validé', updatedAt: '24/07/2026' },
  { reference: 'OMA-2026-003', postulant: 'Equaflight Services', phase: 'Inspection et avis', status: 'En cours', updatedAt: '22/07/2026' },
];

const helper = createColumnHelper<Dossier>();
const columns = [
  helper.accessor('reference', { header: 'Référence', cell: (info) => <strong>{info.getValue()}</strong> }),
  helper.accessor('postulant', { header: 'Postulant' }),
  helper.accessor('phase', { header: 'Phase actuelle' }),
  helper.accessor('status', {
    header: 'Statut',
    cell: (info) => {
      const status = info.getValue();
      return <StatusBadge tone={status === 'Validé' ? 'success' : status === 'À corriger' ? 'warning' : 'info'} dot>{status}</StatusBadge>;
    },
  }),
  helper.accessor('updatedAt', { header: 'Mise à jour' }),
];

function PageExample({ compact = false }: { compact?: boolean }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [status, setStatus] = React.useState('all');
  const [phase, setPhase] = React.useState('all');
  const [date, setDate] = React.useState<Date>();

  const table = useReactTable({
    data: dossiers,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const activeFilterCount = Number(status !== 'all') + Number(phase !== 'all') + Number(Boolean(date));

  return (
    <div data-density={compact ? 'compact' : 'comfortable'} style={{ minHeight: '100vh', padding: 24, background: 'var(--surface-page)' }}>
      <EntityListPage
        header={
          <PageHeader
            breadcrumbs={<span>Navigation / Dossiers DN</span>}
            title="Dossiers de certification"
            description="Suivez les demandes, les phases en cours et les actions prioritaires."
            metadata={<StatusBadge tone="info">42 dossiers</StatusBadge>}
            actions={<Button leadingIcon={<Plus size={16} />}>Nouveau dossier</Button>}
            secondaryActions={<Button variant="outline">Exporter</Button>}
          />
        }
        stats={
          <StatsGrid
            columns={4}
            items={[
              { id: 'active', label: 'Dossiers en cours', value: '42', description: 'Toutes phases confondues', trend: '+8,2 %', tone: 'info', icon: <ClipboardList /> },
              { id: 'review', label: 'À corriger', value: '7', description: 'Retour attendu du postulant', trend: 'Prioritaire', tone: 'warning', icon: <TimerReset /> },
              { id: 'closed', label: 'Finalisés ce mois', value: '18', description: 'Décision enregistrée', trend: '+4', tone: 'success', icon: <FileCheck2 /> },
              { id: 'late', label: 'Échéances dépassées', value: '5', description: 'Nécessitent une action', trend: 'À traiter', tone: 'danger', icon: <TimerReset /> },
            ]}
          />
        }
        filters={
          <FilterBar
            search={<Input aria-label="Rechercher" placeholder="Rechercher un dossier ou un postulant…" leadingIcon={<Search size={16} />} />}
            filters={
              <>
                <Select ariaLabel="Statut" value={status} onValueChange={setStatus} options={[
                  { label: 'Tous les statuts', value: 'all' },
                  { label: 'En cours', value: 'active' },
                  { label: 'À corriger', value: 'correction' },
                  { label: 'Validé', value: 'validated' },
                ]} />
                <Select ariaLabel="Phase" value={phase} onValueChange={setPhase} options={[
                  { label: 'Toutes les phases', value: 'all' },
                  { label: 'Phase préliminaire', value: 'preliminary' },
                  { label: 'Évaluation documentaire', value: 'evaluation' },
                  { label: 'Inspection et avis', value: 'inspection' },
                ]} />
                <DatePicker value={date} onChange={setDate} ariaLabel="Date de mise à jour" placeholder="Date de mise à jour" />
              </>
            }
            activeFilterCount={activeFilterCount}
            onReset={() => { setStatus('all'); setPhase('all'); setDate(undefined); }}
            collapsible
          />
        }
        table={<DataTable table={table} emptyState="Aucun dossier ne correspond aux critères." onRowClick={() => undefined} />}
        pagination={
          <>
            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>1–4 sur 42 dossiers</span>
            <div style={{ display: 'flex', gap: 'var(--layout-gap-sm, 0.5rem)' }}>
              <Button variant="outline" size="sm" disabled>Précédent</Button>
              <Button variant="outline" size="sm">Suivant</Button>
            </div>
          </>
        }
      />
    </div>
  );
}

const meta = {
  title: 'Patterns/EntityListPage',
  component: EntityListPage,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof EntityListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <PageExample /> };
export const Compact: Story = { render: () => <PageExample compact /> };
export const WithoutStats: Story = {
  args: {
    header: <PageHeader title="Liste simplifiée" description="Composition sans indicateurs." />,
    filters: <FilterBar search={<Input aria-label="Rechercher" placeholder="Rechercher…" />} />,
    table: <div style={{ padding: 24 }}>Zone de résultats</div>,
  },
};
export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'grid' }}>
      {(['neutral', 'prestix', 'anac-institutional'] as const).map((theme) => (
        <section key={theme} data-theme={theme}><PageExample compact /></section>
      ))}
    </div>
  ),
};
