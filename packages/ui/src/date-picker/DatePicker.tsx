import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { DayPicker } from 'react-day-picker';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import './date-picker.css';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date?: Date) => void;
  placeholder?: string;
  ariaLabel: string;
  disabled?: boolean;
}

export function DatePicker({ value, onChange, placeholder = 'Choisir une date', ariaLabel, disabled }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button type="button" className="fp-date-picker__trigger" aria-label={ariaLabel} disabled={disabled} data-empty={!value || undefined}>
          <CalendarDays size={16} aria-hidden="true" />
          <span>{value ? format(value, 'dd MMM yyyy', { locale: fr }) : placeholder}</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="fp-date-picker__content" align="start" sideOffset={6}>
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => { onChange?.(date); if (date) setOpen(false); }}
            locale={fr}
            showOutsideDays
            components={{ Chevron: ({ orientation }) => orientation === 'left' ? <ChevronLeft size={16} /> : <ChevronRight size={16} /> }}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
