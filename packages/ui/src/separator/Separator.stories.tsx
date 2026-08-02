import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

const meta = { title: 'UI/Separator', component: Separator, tags: ['autodocs'], parameters: { layout: 'centered' } } satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 420, display: 'grid', gap: 12 }}>
      <strong>Informations générales</strong>
      <Separator decorative={false} />
      <span style={{ color: 'var(--text-secondary)' }}>Contenu de la section.</span>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 32 }}>
      <span>Modifier</span><Separator orientation="vertical" /><span>Dupliquer</span><Separator orientation="vertical" /><span>Archiver</span>
    </div>
  ),
};
