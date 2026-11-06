'use client';

import {cn} from '@/lib/utils';
import {FieldError} from '@/components/ui/field-error';

const fieldClass =
  'w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none transition-colors ' +
  'border-gray-300 focus:border-gray-900 dark:border-gray-700 dark:focus:border-gray-100';

export function ContactFields({
  values,
  errors,
  onChange,
}: {
  values: {name: string; email: string; phone: string};
  errors: {name?: string; email?: string; phone?: string};
  onChange: (next: Partial<typeof values>) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          className={cn(fieldClass, errors.name && 'border-red-500')}
          value={values.name}
          onChange={(e) => onChange({name: e.target.value})}
          placeholder="Jane Doe"
          autoComplete="name"
        />
        <FieldError error={errors.name} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          className={cn(fieldClass, errors.email && 'border-red-500')}
          value={values.email}
          onChange={(e) => onChange({email: e.target.value})}
          placeholder="jane@example.com"
          autoComplete="email"
        />
        <FieldError error={errors.email} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Phone <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="tel"
          className={cn(fieldClass, errors.phone && 'border-red-500')}
          value={values.phone}
          onChange={(e) => onChange({phone: e.target.value})}
          placeholder="+254 700 000 000"
          autoComplete="tel"
        />
        <FieldError error={errors.phone} />
      </div>
    </div>
  );
}
