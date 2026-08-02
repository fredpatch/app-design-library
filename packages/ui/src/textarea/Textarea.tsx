import * as React from 'react';
import { cn } from '../utils/cn';
import './textarea.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: 'none' | 'vertical' | 'both';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, resize = 'vertical', ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn('fp-textarea', className)}
      data-resize={resize}
      {...props}
    />
  ),
);

Textarea.displayName = 'Textarea';
