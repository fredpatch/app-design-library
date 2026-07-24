import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle2, Clock3, ShieldAlert } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

const meta = {
  title: 'UI/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'En attente',
    tone: 'neutral',
    size: 'md',
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <StatusBadge tone="neutral">Brouillon</StatusBadge>
      <StatusBadge tone="info">En cours</StatusBadge>
      <StatusBadge tone="success">Validé</StatusBadge>
      <StatusBadge tone="warning">À vérifier</StatusBadge>
      <StatusBadge tone="danger">Rejeté</StatusBadge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <StatusBadge size="sm" tone="info">Petit</StatusBadge>
      <StatusBadge size="md" tone="info">Moyen</StatusBadge>
    </div>
  ),
};

export const WithDot: Story = {
  args: {
    dot: true,
    tone: 'success',
    children: 'Actif',
  },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <StatusBadge tone="success" icon={<CheckCircle2 />}>Validé</StatusBadge>
      <StatusBadge tone="warning" icon={<Clock3 />}>En attente</StatusBadge>
      <StatusBadge tone="danger" icon={<ShieldAlert />}>Action requise</StatusBadge>
    </div>
  ),
};

export const LongFrenchLabel: Story = {
  args: {
    tone: 'warning',
    children: 'En attente de validation par le responsable administratif',
  },
};

export const DensityComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['comfortable', 'compact', 'dense'] as const).map((density) => (
        <div key={density} data-density={density} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <strong style={{ width: 110 }}>{density}</strong>
          <StatusBadge tone="success" dot>Validé</StatusBadge>
          <StatusBadge tone="warning">En attente</StatusBadge>
        </div>
      ))}
    </div>
  ),
};

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, minWidth: 560 }}>
      {(['neutral', 'prestix', 'anac-institutional'] as const).map((theme) => (
        <div
          key={theme}
          data-theme={theme}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 12,
            padding: 16,
            background: 'var(--surface-page)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <strong style={{ width: 150 }}>{theme}</strong>
          <StatusBadge tone="info">En cours</StatusBadge>
          <StatusBadge tone="success">Validé</StatusBadge>
          <StatusBadge tone="danger">Rejeté</StatusBadge>
        </div>
      ))}
    </div>
  ),
};
