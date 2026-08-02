import type { Meta, StoryObj } from '@storybook/react';
import { Info } from 'lucide-react';
import { Button } from '../button/Button';
import { Tooltip } from './Tooltip';

const meta = { title: 'UI/Tooltip', component: Tooltip, tags: ['autodocs'], parameters: { layout: 'centered' } } satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { content: 'Informations complémentaires', children: <Button variant="outline" size="icon" aria-label="Informations"><Info /></Button> } };
export const LongFrenchContent: Story = { args: { content: 'Cette action permet de consulter les informations complémentaires associées au dossier sélectionné.', children: <Button variant="outline">Afficher l’aide</Button> } };
export const ThemeComparison: Story = { render: () => <div style={{ display: 'flex', gap: 24 }}>{['neutral','prestix','anac-institutional'].map((theme) => <div key={theme} data-theme={theme} style={{ padding: 24, background: 'var(--surface-page)' }}><Tooltip content={`Infobulle ${theme}`}><Button variant="outline">{theme}</Button></Tooltip></div>)}</div> };
