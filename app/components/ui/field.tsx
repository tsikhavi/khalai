import * as React from 'react';
import {cn} from '@/lib/utils';

const Field = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn('grid gap-2', className)}
    {...props}
  />
));
Field.displayName = 'Field';

const FieldGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
  <div
    ref={ref}
    className={cn('space-y-4', className)}
    {...props}
  />
));
FieldGroup.displayName = 'FieldGroup';

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({className, ...props}, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
));
FieldLabel.displayName = 'FieldLabel';

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
FieldDescription.displayName = 'FieldDescription';

interface FieldSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

const FieldSeparator = React.forwardRef<HTMLDivElement, FieldSeparatorProps>(
  ({className, orientation = 'horizontal', ...props}, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex items-center gap-2',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        className
      )}
      {...props}>
      <div className="flex-1 border-t border-border" />
      <span
        className="text-xs text-muted-foreground px-2"
        data-slot="field-separator-content">
        {props.children}
      </span>
      <div className="flex-1 border-t border-border" />
    </div>
  )
);
FieldSeparator.displayName = 'FieldSeparator';

export {Field, FieldGroup, FieldLabel, FieldDescription, FieldSeparator};
