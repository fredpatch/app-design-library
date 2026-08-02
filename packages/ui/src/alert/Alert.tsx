import * as React from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  X,
} from 'lucide-react';
import { cn } from '../utils/cn';
import './alert.css';

export type AlertTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: AlertTone;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  dismissLabel?: string;
  onDismiss?: () => void;
}

const defaultIcons: Record<AlertTone, React.ReactNode> = {
  neutral: <Info />,
  info: <Info />,
  success: <CheckCircle2 />,
  warning: <TriangleAlert />,
  danger: <AlertCircle />,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      tone = 'neutral',
      title,
      icon,
      actions,
      dismissLabel = 'Fermer',
      onDismiss,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn('fp-alert', `fp-alert--${tone}`, className)}
      role={tone === 'danger' ? 'alert' : 'status'}
      {...props}
    >
      <span className="fp-alert__icon" aria-hidden="true">
        {icon ?? defaultIcons[tone]}
      </span>
      <div className="fp-alert__content">
        {title ? <div className="fp-alert__title">{title}</div> : null}
        {children ? (
          <div className="fp-alert__description">{children}</div>
        ) : null}
        {actions ? <div className="fp-alert__actions">{actions}</div> : null}
      </div>
      {onDismiss ? (
        <button
          className="fp-alert__dismiss"
          type="button"
          aria-label={dismissLabel}
          onClick={onDismiss}
        >
          <X />
        </button>
      ) : null}
    </div>
  ),
);

Alert.displayName = 'Alert';
