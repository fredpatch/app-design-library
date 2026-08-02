import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledSwitchStory() {
  const [checked, setChecked] = React.useState(true);

  return (
    <Switch
      checked={checked}
      onCheckedChange={setChecked}
      label={checked ? 'Accès au portail activé' : 'Accès au portail désactivé'}
      description="L’état est contrôlé par le composant parent."
    />
  );
}

export const Default: Story = {
  args: {
    label: 'Notifications par e-mail',
    description: 'Recevoir un résumé lorsqu’une action importante est enregistrée.',
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    label: 'Renouvellement automatique',
    description: 'Prolonger automatiquement l’abonnement à sa date d’échéance.',
  },
};

export const Controlled: Story = {
  render: () => <ControlledSwitchStory />,
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Switch disabled label="Option indisponible" description="Cette préférence est verrouillée par l’administrateur." />
      <Switch disabled defaultChecked label="Configuration imposée" />
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    invalid: true,
    label: 'Consentement obligatoire',
    description: 'Activez cette option pour continuer.',
  },
};

export const LongFrenchContent: Story = {
  args: {
    label: 'Autoriser l’envoi automatique des rappels avant expiration de l’abonnement du client',
    description: 'Les rappels sont envoyés selon les délais configurés par l’établissement et peuvent être désactivés pour chaque client.',
  },
};

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20, width: 420 }}>
      {(['neutral', 'prestix', 'anac-institutional'] as const).map((theme) => (
        <section key={theme} data-theme={theme} style={{ padding: 16, background: 'var(--surface-page)', color: 'var(--text-primary)' }}>
          <Switch defaultChecked label={theme} description="Vérification du contraste et des états actifs." />
        </section>
      ))}
    </div>
  ),
};

export const DensityComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20, width: 420 }}>
      {(['comfortable', 'compact', 'dense'] as const).map((density) => (
        <section key={density} data-density={density}>
          <Switch defaultChecked label={density} description="Comparaison de la densité d’affichage." />
        </section>
      ))}
    </div>
  ),
};
