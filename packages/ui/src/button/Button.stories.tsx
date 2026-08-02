import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: 'Enregistrer', variant: 'primary', size: 'md' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'outline',
        'ghost',
        'destructive',
        'link',
      ],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'icon'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = {
  args: { loading: true, children: 'Enregistrement' },
};
export const Disabled: Story = { args: { disabled: true } };
export const LongFrenchLabel: Story = {
  args: { children: 'Enregistrer et transmettre le dossier pour validation' },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Button variant="primary">Primaire</Button>
      <Button variant="secondary">Secondaire</Button>
      <Button variant="outline">Contour</Button>
      <Button variant="ghost">Discret</Button>
      <Button variant="destructive">Supprimer</Button>
      <Button variant="link">Voir les détails</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Button size="sm">Petit</Button>
      <Button size="md">Moyen</Button>
      <Button size="lg">Grand</Button>
      <Button size="icon" aria-label="Ajouter">
        <Plus />
      </Button>
    </div>
  ),
};

export const Icons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button leadingIcon={<Plus />}>Ajouter</Button>
      <Button trailingIcon={<ArrowRight />}>Continuer</Button>
      <Button variant="destructive" leadingIcon={<Trash2 />}>
        Supprimer
      </Button>
    </div>
  ),
};

export const DensityComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {(['comfortable', 'compact', 'dense'] as const).map((density) => (
        <div
          key={density}
          data-density={density}
          style={{ display: 'flex', alignItems: 'center', gap: 12 }}
        >
          <strong style={{ width: 110 }}>{density}</strong>
          <Button>Enregistrer</Button>
          <Button variant="outline">Annuler</Button>
        </div>
      ))}
    </div>
  ),
};

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, minWidth: 520 }}>
      {(['neutral', 'prestix', 'anac-institutional'] as const).map((theme) => (
        <div
          key={theme}
          data-theme={theme}
          style={{
            display: 'flex',
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
          <Button>Enregistrer</Button>
          <Button variant="secondary">Annuler</Button>
        </div>
      ))}
    </div>
  ),
};
