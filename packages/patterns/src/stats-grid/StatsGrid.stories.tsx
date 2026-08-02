import type { Meta, StoryObj } from '@storybook/react';
import { CalendarClock, CheckCircle2, ClipboardList, FileWarning, Users } from 'lucide-react';
import { StatsGrid } from './StatsGrid';
import type { StatItem } from './stats-grid.types';

const items: StatItem[] = [
  {
    id: 'dossiers',
    label: 'Dossiers en cours',
    value: '42',
    description: 'Toutes phases confondues',
    trend: '+8,2 %',
    tone: 'info',
    icon: <ClipboardList />,
    onClick: () => undefined,
    ariaLabel: 'Ouvrir les 42 dossiers en cours',
  },
  {
    id: 'meetings',
    label: 'Réunions prévues',
    value: '7',
    description: 'Dans les 14 prochains jours',
    trend: '3 cette semaine',
    tone: 'neutral',
    icon: <CalendarClock />,
  },
  {
    id: 'completed',
    label: 'Dossiers finalisés',
    value: '18',
    description: 'Depuis le début du mois',
    trend: '+4',
    tone: 'success',
    icon: <CheckCircle2 />,
  },
  {
    id: 'late',
    label: 'Échéances dépassées',
    value: '5',
    description: 'Nécessitent une action prioritaire',
    trend: 'À traiter',
    tone: 'danger',
    icon: <FileWarning />,
  },
];

const meta = {
  title: 'Patterns/StatsGrid',
  component: StatsGrid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { items, columns: 4 },
} satisfies Meta<typeof StatsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
export const ThreeColumns: Story = { args: { columns: 3, items: items.slice(0, 3) } };
export const TwoColumns: Story = { args: { columns: 2, items: items.slice(0, 2) } };

export const LongFrenchContent: Story = {
  args: {
    items: [
      {
        id: 'postulants',
        label: 'Demandes de création de compte postulant en attente de vérification administrative',
        value: '12',
        description: 'Inclut les demandes déposées en ligne et celles enregistrées à l’accueil.',
        trend: 'Prioritaire',
        tone: 'warning',
        icon: <Users />,
      },
      ...items.slice(1),
    ],
  },
};

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['neutral', 'prestix', 'anac-institutional'] as const).map((theme) => (
        <section key={theme} data-theme={theme} style={{ padding: 20, background: 'var(--surface-page)' }}>
          <StatsGrid items={items} columns={4} />
        </section>
      ))}
    </div>
  ),
};

export const DensityComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['comfortable', 'compact', 'dense'] as const).map((density) => (
        <section key={density} data-density={density}>
          <StatsGrid items={items} columns={4} />
        </section>
      ))}
    </div>
  ),
};
