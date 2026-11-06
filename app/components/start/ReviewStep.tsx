'use client';

import {ProjectAnswers, visibleSteps} from '@/[locale]/start/steps';

export function ReviewStep({answers}: {answers: ProjectAnswers}) {
  const steps = visibleSteps(answers);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800">
      <dl className="divide-y divide-gray-200 dark:divide-gray-800">
        {steps.map((s) => {
          const raw = answers[s.answerKey];
          let display = '—';

          if (s.id === 'audience') {
            display =
              {
                beginner: 'New to tech',
                some: 'Some basics',
                confident: 'Tech-savvy',
              }[answers.techLevel as 'beginner' | 'some' | 'confident'] ?? '—';
          } else if (s.id === 'projectType' && s.optionGroups) {
            const all = s.optionGroups.flatMap((g) => g.options);
            display =
              all.find((o) => o.value === answers.projectType)?.label ?? '—';
          } else if (s.id === 'projectType') {
            display = answers.projectTypeOther ?? '—';
          } else if (s.type === 'multi' && Array.isArray(raw)) {
            display =
              raw
                .map((v) => s.options?.find((o) => o.value === v)?.label ?? v)
                .join(', ') || '—';
          } else if (typeof raw === 'string' && raw.trim()) {
            display = raw;
          } else if (s.id === 'website' && answers.website) {
            display = answers.website;
          } else if (!s.required && s.id !== 'website' && !raw) {
            return null; // hide empty optional rows
          }

          if (s.id === 'contact') return null; // rendered separately below

          return (
            <div
              key={s.id}
              className="flex gap-4 px-4 py-3 text-sm">
              <dt className="w-28 shrink-0 text-gray-500">{s.title}</dt>
              <dd className="min-w-0 wrap-break-word">{display}</dd>
            </div>
          );
        })}

        {/* Contact block */}
        <div className="flex gap-4 px-4 py-3 text-sm">
          <dt className="w-28 shrink-0 text-gray-500">Contact</dt>
          <dd className="min-w-0 wrap-break-word">
            {answers.name} · {answers.email}
            {answers.phone ? ` · ${answers.phone}` : ''}
          </dd>
        </div>
      </dl>
    </div>
  );
}
