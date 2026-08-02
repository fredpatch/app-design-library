import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../button/Button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './DropdownMenu';

const meta = {
  title: 'UI/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DropdownMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

function Example() {
  const [archived, setArchived] = React.useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Ouvrir le menu">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions du dossier</DropdownMenuLabel>
        <DropdownMenuItem>
          Ouvrir<DropdownMenuShortcut>Entrée</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>Dupliquer</DropdownMenuItem>
        <DropdownMenuCheckboxItem
          checked={archived}
          onCheckedChange={(value) => setArchived(value === true)}
        >
          Afficher les éléments archivés
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>Supprimer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const Default: Story = { render: () => <Example /> };
export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      {['neutral', 'prestix', 'anac-institutional'].map((theme) => (
        <div
          key={theme}
          data-theme={theme}
          style={{ padding: 24, background: 'var(--surface-page)' }}
        >
          <Example />
        </div>
      ))}
    </div>
  ),
};
