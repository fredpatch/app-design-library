import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example({
  pageCount = 12,
  showFirstLast = true,
}: {
  pageCount?: number;
  showFirstLast?: boolean;
}) {
  const [page, setPage] = React.useState(4);
  return (
    <div style={{ width: 720, maxWidth: 'calc(100vw - 48px)' }}>
      <Pagination
        page={page}
        pageCount={pageCount}
        onPageChange={setPage}
        showFirstLast={showFirstLast}
      />
    </div>
  );
}

export const Default: Story = { render: () => <Example /> };
export const FewPages: Story = { render: () => <Example pageCount={4} /> };
export const WithoutFirstLast: Story = {
  render: () => <Example showFirstLast={false} />,
};
export const Disabled: Story = {
  args: {
    page: 2,
    pageCount: 8,
    disabled: true,
    onPageChange: () => undefined,
  },
};
export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20, width: 760 }}>
      {(['neutral', 'prestix', 'anac-institutional'] as const).map((theme) => (
        <div
          key={theme}
          data-theme={theme}
          style={{ padding: 20, background: 'var(--surface-page)' }}
        >
          <Example />
        </div>
      ))}
    </div>
  ),
};
export const DensityComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20, width: 760 }}>
      {(['comfortable', 'compact', 'dense'] as const).map((density) => (
        <div key={density} data-density={density}>
          <Example />
        </div>
      ))}
    </div>
  ),
};
