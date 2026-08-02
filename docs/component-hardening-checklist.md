# Component hardening checklist

Use this checklist for every public component and structural pattern before release.

## Styling isolation

- Use only CSS custom properties defined by the token or theme packages.
- Provide a safe fallback when a component may render without the full theme bundle.
- Avoid broad descendant selectors such as `.component input`.
- Target component classes or intentional direct children.
- Verify nested polished controls are not restyled by their parent pattern.

## Public API

- Forward refs when the component exposes an interactive or measurable DOM element.
- Accept `className` on the public root where composition requires it.
- Preserve native attributes unless intentionally replaced by a Radix primitive.
- Support controlled and uncontrolled state where the interaction model benefits from both.
- Avoid project-specific labels and business rules in reusable components.

## Accessibility

- Verify keyboard-only operation and visible focus.
- Ensure icon-only actions have accessible labels.
- Associate labels, descriptions, errors, and controls using IDs and ARIA attributes.
- Use `aria-current`, `aria-invalid`, `aria-busy`, and live-region roles only when semantically appropriate.
- Check disabled contrast and prevent disabled interactions.

## Portals and themes

- Test portal content under neutral, Prestix, and ANAC themes.
- Ensure portal surfaces receive the active theme and density variables.
- Verify collision handling near every viewport edge.
- Confirm focus returns to the trigger after closing overlays.

## Content resilience

- Test long French labels, descriptions, table values, and action names.
- Test narrow parent containers independently from browser width.
- Verify overflow behavior at 320 px and inside split-view panels.
- Avoid fixed widths unless accompanied by responsive constraints.

## Motion and loading

- Respect `prefers-reduced-motion`.
- Avoid motion that changes layout unexpectedly.
- Ensure skeletons preserve the approximate final layout.
- Keep loading and disabled states distinguishable.

## Required commands

```bash
npm run audit:components
npm run typecheck
npm run build
npm run dev --workspace=apps/storybook
```
