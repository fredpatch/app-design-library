import type { Meta, StoryObj } from '@storybook/react';
import { ArrowLeft, Download, Plus } from 'lucide-react';
import { Button, StatusBadge } from '@fredpatch/ui';
import { PageHeader } from './PageHeader';

const meta = {
  title: 'Patterns/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    title: 'Dossiers de certification',
    description: 'Suivez les demandes, les phases actives et les prochaines actions attendues.',
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    actions: (
      <>
        <Button variant="outline" leadingIcon={<Download />}>Exporter</Button>
        <Button leadingIcon={<Plus />}>Nouveau dossier</Button>
      </>
    ),
  },
};

export const FullComposition: Story = {
  args: {
    breadcrumbs: <span>Certification / Dossiers / OMA-2026-014</span>,
    backAction: <Button variant="ghost" size="icon" aria-label="Retour"><ArrowLeft /></Button>,
    title: 'OMEGA Aviation Maintenance — OMA-2026-014',
    metadata: <StatusBadge tone="warning" dot>Évaluation documentaire</StatusBadge>,
    description: 'Dossier de certification d’organisme de maintenance agréé. Dernière mise à jour le 2 août 2026 à 10:42.',
    actions: (
      <>
        <Button variant="outline">Télécharger le dossier</Button>
        <Button>Enregistrer une action</Button>
      </>
    ),
    secondaryActions: (
      <>
        <Button variant="ghost">Historique</Button>
        <Button variant="ghost">Documents</Button>
        <Button variant="ghost">Réunions</Button>
      </>
    ),
  },
};

export const LongFrenchContent: Story = {
  args: {
    title: 'Gestion des demandes de délivrance, renouvellement et modification des certificats d’agrément',
    description: 'Cette page centralise les dossiers en cours de traitement et permet aux agents habilités de consulter les pièces justificatives, d’enregistrer les décisions et de suivre les délais réglementaires applicables.',
    actions: <Button>Créer une nouvelle demande de certification</Button>,
  },
};

export const ThemeComparison: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['neutral', 'prestix', 'anac-institutional'] as const).map((theme) => (
        <section key={theme} data-theme={theme} style={{ padding: 20, background: 'var(--surface-page)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)' }}>
          <PageHeader {...args} metadata={<StatusBadge tone="success" dot>Actif</StatusBadge>} actions={<Button>Action principale</Button>} />
        </section>
      ))}
    </div>
  ),
};

export const DensityComparison: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['comfortable', 'compact', 'dense'] as const).map((density) => (
        <section key={density} data-density={density} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
          <PageHeader {...args} metadata={<StatusBadge>{density}</StatusBadge>} actions={<Button>Ajouter</Button>} />
        </section>
      ))}
    </div>
  ),
};
