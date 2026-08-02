import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronRight, Circle } from 'lucide-react';
import './dropdown-menu.css';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content ref={ref} sideOffset={sideOffset} collisionPadding={8} className={['fp-dropdown-menu', className].filter(Boolean).join(' ')} {...props} />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean; destructive?: boolean }
>(({ className, inset, destructive, ...props }, ref) => (
  <DropdownMenuPrimitive.Item ref={ref} data-inset={inset || undefined} data-destructive={destructive || undefined} className={['fp-dropdown-menu__item', className].filter(Boolean).join(' ')} {...props} />
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ children, checked, className, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem ref={ref} checked={checked} className={['fp-dropdown-menu__item fp-dropdown-menu__item--checkable', className].filter(Boolean).join(' ')} {...props}>
    <span className="fp-dropdown-menu__indicator"><DropdownMenuPrimitive.ItemIndicator><Check /></DropdownMenuPrimitive.ItemIndicator></span>{children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ children, className, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem ref={ref} className={['fp-dropdown-menu__item fp-dropdown-menu__item--checkable', className].filter(Boolean).join(' ')} {...props}>
    <span className="fp-dropdown-menu__indicator"><DropdownMenuPrimitive.ItemIndicator><Circle /></DropdownMenuPrimitive.ItemIndicator></span>{children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

export const DropdownMenuLabel = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Label>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }>(({ className, inset, ...props }, ref) => <DropdownMenuPrimitive.Label ref={ref} data-inset={inset || undefined} className={['fp-dropdown-menu__label', className].filter(Boolean).join(' ')} {...props} />);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

export const DropdownMenuSeparator = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>>(({ className, ...props }, ref) => <DropdownMenuPrimitive.Separator ref={ref} className={['fp-dropdown-menu__separator', className].filter(Boolean).join(' ')} {...props} />);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export const DropdownMenuSubTrigger = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }>(({ children, className, inset, ...props }, ref) => <DropdownMenuPrimitive.SubTrigger ref={ref} data-inset={inset || undefined} className={['fp-dropdown-menu__item', className].filter(Boolean).join(' ')} {...props}>{children}<ChevronRight className="fp-dropdown-menu__chevron" /></DropdownMenuPrimitive.SubTrigger>);
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

export const DropdownMenuSubContent = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.SubContent>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>>(({ className, ...props }, ref) => <DropdownMenuPrimitive.SubContent ref={ref} className={['fp-dropdown-menu', className].filter(Boolean).join(' ')} {...props} />);
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

export function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={['fp-dropdown-menu__shortcut', className].filter(Boolean).join(' ')} {...props} />;
}
