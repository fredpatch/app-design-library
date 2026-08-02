import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/Button';
import { Alert } from './Alert';

const meta = { title: 'UI/Alert', component: Alert, tags: ['autodocs'], parameters: { layout: 'centered' } } satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16, width: 720, maxWidth: 'calc(100vw - 48px)' }}>
      <Alert title="Information disponible" tone="info">Une nouvelle version du dossier est disponible.</Alert>
      <Alert title="Enregistrement terminé" tone="success">Les modifications ont été enregistrées avec succès.</Alert>
      <Alert title="Attention requise" tone="warning">Trois pièces justificatives doivent encore être ajoutées.</Alert>
      <Alert title="Impossible de poursuivre" tone="danger">Le service distant ne répond pas. Réessayez dans quelques minutes.</Alert>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Alert
      tone="warning"
      title="Abonnement arrivant à expiration"
      actions={<><Button size="sm">Renouveler</Button><Button size="sm" variant="outline">Voir le client</Button></>}
      onDismiss={() => undefined}
      style={{ width: 680 }}
    >
      Cet abonnement expire dans cinq jours. Vérifiez le paiement avant de confirmer le renouvellement.
    </Alert>
  ),
};

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {['neutral', 'prestix', 'anac-institutional'].map((theme) => (
        <div key={theme} data-theme={theme} style={{ width: 680, padding: 16, background: 'var(--surface-page)' }}>
          <Alert tone="info" title={theme}>Contenu long en français pour vérifier le contraste et le retour à la ligne.</Alert>
        </div>
      ))}
    </div>
  ),
};
