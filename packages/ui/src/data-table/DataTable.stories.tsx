import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { StatusBadge } from '../status-badge/StatusBadge';
import { DataTable } from './DataTable';

type Dossier = {
  id: string;
  postulant: string;
  reference: string;
  phase: string;
  status: 'En cours' | 'À corriger' | 'Validé';
  updatedAt: string;
};

const data: Dossier[] = [
  {
    id: '1',
    postulant: 'Air Service Gabon',
    reference: 'OMA-2026-014',
    phase: 'Évaluation documentaire',
    status: 'En cours',
    updatedAt: '30/07/2026',
  },
  {
    id: '2',
    postulant: 'Afrijet Business Service',
    reference: 'OMA-2026-009',
    phase: 'Demande formelle',
    status: 'À corriger',
    updatedAt: '28/07/2026',
  },
  {
    id: '3',
    postulant: 'Gabon Aero Solutions',
    reference: 'OMA-2026-005',
    phase: 'Phase préliminaire',
    status: 'Validé',
    updatedAt: '24/07/2026',
  },
  {
    id: '4',
    postulant: 'Equaflight Services',
    reference: 'OMA-2026-003',
    phase: 'Inspection et avis',
    status: 'En cours',
    updatedAt: '22/07/2026',
  },
];

const columnHelper = createColumnHelper<Dossier>();
const columns = [
  columnHelper.accessor('reference', {
    header: 'Référence',
    cell: (info) => <strong>{info.getValue()}</strong>,
  }),
  columnHelper.accessor('postulant', { header: 'Postulant' }),
  columnHelper.accessor('phase', { header: 'Phase actuelle' }),
  columnHelper.accessor('status', {
    header: 'Statut',
    cell: (info) => {
      const status = info.getValue();
      const tone =
        status === 'Validé'
          ? 'success'
          : status === 'À corriger'
            ? 'warning'
            : 'info';
      return (
        <StatusBadge tone={tone} dot>
          {status}
        </StatusBadge>
      );
    },
  }),
  columnHelper.accessor('updatedAt', { header: 'Dernière mise à jour' }),
];

function TableExample({
  rows = data,
  loading = false,
  error = false,
  density = 'inherit',
  stickyHeader = false,
}: {
  rows?: Dossier[];
  loading?: boolean;
  error?: boolean;
  density?: 'inherit' | 'comfortable' | 'compact' | 'dense';
  stickyHeader?: boolean;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div style={{ width: 980, maxWidth: 'calc(100vw - 48px)' }}>
      <DataTable
        table={table}
        loading={loading}
        loadingRowCount={4}
        errorState={
          error
            ? 'Impossible de charger les dossiers. Veuillez réessayer.'
            : undefined
        }
        emptyState="Aucun dossier ne correspond aux critères sélectionnés."
        density={density}
        stickyHeader={stickyHeader}
        onRowClick={(row) => row.toggleSelected()}
        getRowLabel={(row) => `Ouvrir le dossier ${row.original.reference}`}
      />
    </div>
  );
}

const meta = {
  title: 'UI/DataTable',
  component: DataTable,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <TableExample /> };
export const Loading: Story = { render: () => <TableExample loading /> };
export const Empty: Story = { render: () => <TableExample rows={[]} /> };
export const ErrorState: Story = { render: () => <TableExample error /> };
export const StickyHeader: Story = {
  render: () => (
    <div style={{ height: 250, overflow: 'auto' }}>
      <TableExample
        rows={[
          ...data,
          ...data.map((item, index) => ({
            ...item,
            id: `${item.id}-${index}`,
            reference: `${item.reference}-${index + 1}`,
          })),
        ]}
        stickyHeader
      />
    </div>
  ),
};

export const DensityComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['comfortable', 'compact', 'dense'] as const).map((density) => (
        <section key={density}>
          <strong style={{ display: 'block', marginBottom: 8 }}>
            {density}
          </strong>
          <TableExample density={density} />
        </section>
      ))}
    </div>
  ),
};

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['neutral', 'prestix', 'anac-institutional'] as const).map((theme) => (
        <section
          key={theme}
          data-theme={theme}
          style={{
            padding: 16,
            background: 'var(--surface-page)',
            color: 'var(--text-primary)',
          }}
        >
          <strong style={{ display: 'block', marginBottom: 8 }}>{theme}</strong>
          <TableExample rows={data.slice(0, 3)} />
        </section>
      ))}
    </div>
  ),
};
