import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledCheckboxStory() {
  const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(false);

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={setChecked}
      label="Activer le suivi hebdomadaire"
      description={`État actuel : ${checked === true ? 'activé' : checked === 'indeterminate' ? 'partiel' : 'désactivé'}`}
    />
  );
}

export const Default: Story = {
  args: { label: 'Recevoir les notifications par e-mail' },
};

export const WithDescription: Story = {
  args: {
    label: 'Autoriser les rappels automatiques',
    description: 'Un rappel sera envoyé avant l’échéance de l’abonnement.',
  },
};

export const Checked: Story = {
  args: { defaultChecked: true, label: 'Dossier vérifié' },
};

export const Indeterminate: Story = {
  args: { defaultChecked: 'indeterminate', label: 'Sélection partielle' },
};

export const Invalid: Story = {
  args: { invalid: true, label: 'J’accepte les conditions obligatoires' },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Checkbox disabled label="Option indisponible" />
      <Checkbox disabled defaultChecked label="Option activée et verrouillée" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => <ControlledCheckboxStory />,
};

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      {(['neutral', 'prestix', 'anac-institutional'] as const).map((theme) => (
        <div key={theme} data-theme={theme} style={{ padding: 20, background: 'var(--surface-page)' }}>
          <Checkbox defaultChecked label={`Notifications — ${theme}`} description="Validation visuelle du thème." />
        </div>
      ))}
    </div>
  ),
};

export const DensityComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20 }}>
      {(['comfortable', 'compact', 'dense'] as const).map((density) => (
        <div key={density} data-density={density}>
          <Checkbox defaultChecked label={`Rappel actif — ${density}`} />
        </div>
      ))}
    </div>
  ),
};
