import {cn} from '@/lib/utils';

export function FieldError({
  error,
  className,
}: {
  error?: string;
  className?: string;
}) {
  if (!error) return null;
  return (
    <p
      role="alert"
      className={cn(
        'animate-in fade-in slide-in-from-top-1 text-xs font-medium text-destructive',
        className
      )}>
      {error}
    </p>
  );
}
