import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import './select.css';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}
export interface SelectProps {
  id?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  ariaLabel?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export function Select({
  id,
  value,
  defaultValue,
  onValueChange,
  options,
  placeholder = 'Sélectionner',
  ariaLabel,
  disabled,
  required,
  ...ariaProps
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      required={required}
    >
      <SelectPrimitive.Trigger
        id={id}
        className="fp-select__trigger"
        aria-label={ariaLabel}
        {...ariaProps}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="fp-select__chevron">
          <ChevronDown size={16} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="fp-select__content"
          position="popper"
          sideOffset={6}
        >
          <SelectPrimitive.Viewport className="fp-select__viewport">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="fp-select__item"
              >
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="fp-select__indicator">
                  <Check size={15} />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
