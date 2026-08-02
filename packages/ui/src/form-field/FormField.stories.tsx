import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../input/Input';
import { Select } from '../select/Select';
import { Textarea } from '../textarea/Textarea';
import { FormField } from './FormField';

const requestTypeOptions = [
  { value: 'initiale', label: 'Certification initiale' },
  { value: 'renouvellement', label: 'Renouvellement' },
  { value: 'modification', label: 'Modification' },
];

const meta = {
  title: 'UI/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    label: 'Adresse e-mail',
    description: 'Utilisée pour les notifications liées au dossier.',
    children: <Input type="email" placeholder="prenom.nom@anac-gabon.com" />,
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Required: Story = { args: { label: 'Nom de l’organisation', required: true, children: <Input placeholder="Saisir le nom officiel" /> } };
export const WithError: Story = { args: { label: 'Numéro de téléphone', required: true, error: 'Le numéro de téléphone est obligatoire.', children: <Input placeholder="+241 00 00 00 00" /> } };
export const Disabled: Story = { args: { label: 'Référence du dossier', disabled: true, children: <Input defaultValue="OMA-2026-0042" /> } };
export const TextareaField: Story = { args: { label: 'Observations', description: 'Ajoutez uniquement les informations utiles au traitement du dossier.', children: <Textarea placeholder="Saisir les observations" /> } };
export const SelectField: Story = { args: { label: 'Type de demande', required: true, children: <Select ariaLabel="Type de demande" options={requestTypeOptions} placeholder="Sélectionner une option" /> } };
export const LongFrenchContent: Story = { args: { label: 'Dénomination complète de l’organisme demandeur', description: 'Utilisez la dénomination figurant sur les documents juridiques afin d’éviter les divergences lors de la validation administrative.', children: <Input placeholder="Dénomination officielle" /> } };

export const DensityComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20, width: 440 }}>
      {(['comfortable', 'compact', 'dense'] as const).map((density) => (
        <div key={density} data-density={density}>
          <FormField label={`Adresse e-mail — ${density}`} description="Champ de comparaison de densité.">
            <Input type="email" placeholder="prenom.nom@exemple.com" />
          </FormField>
        </div>
      ))}
    </div>
  ),
};

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20, width: 520 }}>
      {(['neutral', 'prestix', 'anac-institutional'] as const).map((theme) => (
        <div key={theme} data-theme={theme} style={{ padding: 20, background: 'var(--surface-page)', color: 'var(--text-primary)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)' }}>
          <FormField label={`Nom complet — ${theme}`} required>
            <Input placeholder="Saisir le nom complet" />
          </FormField>
        </div>
      ))}
    </div>
  ),
};
