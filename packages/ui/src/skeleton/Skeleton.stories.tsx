import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = { title: 'UI/Skeleton', component: Skeleton, tags: ['autodocs'], parameters: { layout: 'centered' } } satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, width: 360, padding: 20, border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', background: 'var(--surface-card)' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Skeleton width={40} height={40} radius="full" />
        <div style={{ display: 'grid', gap: 8, flex: 1 }}>
          <Skeleton width="45%" height={14} />
          <Skeleton width="70%" height={11} />
        </div>
      </div>
      <Skeleton height={96} radius="lg" />
      <Skeleton width="90%" height={12} />
      <Skeleton width="62%" height={12} />
    </div>
  ),
};

export const Static: Story = { args: { width: 320, height: 20, animated: false } };

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {['neutral', 'prestix', 'anac-institutional'].map((theme) => (
        <div key={theme} data-theme={theme} style={{ width: 420, padding: 20, display: 'grid', gap: 10, background: 'var(--surface-page)' }}>
          <Skeleton width="40%" height={14} />
          <Skeleton height={72} radius="lg" />
          <Skeleton width="78%" height={12} />
        </div>
      ))}
    </div>
  ),
};
