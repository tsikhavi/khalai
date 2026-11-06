'use client';

import {useMemo, useState, useTransition} from 'react';
import {useRouter} from 'next/navigation';
import {resolveHint, resolveQuestion, visibleSteps} from './steps';
import {StepShell} from '@/components/start/StepShell';
import {ChoiceGrid} from '@/components/start/ChoiceGrid';
import {ContactFields} from '@/components/start/ContactFields';
import {ReviewStep} from '@/components/start/ReviewStep';
import {StepErrors, validateStep, validateUrl} from '@/lib/validation';
import {ProjectAnswers} from './steps';
import {submitProject} from '@/lib/actions/projects';
import {UrlField} from '@/components/start/UrlField';

export function ProjectWizard() {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<ProjectAnswers>({});
  const [errors, setErrors] = useState<StepErrors>({});
  const [pending, start] = useTransition();

  const steps = useMemo(() => visibleSteps(answers), [answers]);
  const step = steps[stepIndex];
  const isReview = stepIndex >= steps.length;
  const total = steps.length + 1;

  const setField = <K extends keyof ProjectAnswers>(
    key: K,
    value: ProjectAnswers[K]
  ) => {
    setAnswers((a) => ({...a, [key]: value}));
    setErrors((e) => ({...e, [key]: undefined}));
  };

  const next = () => {
    if (isReview) return submit();

    const stepErrors = validateStep(step, answers);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStepIndex((i) => i + 1);
  };

  const back = () => {
    setErrors({});
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const submit = () => {
    const finalErrors: StepErrors = {};
    for (const s of steps) Object.assign(finalErrors, validateStep(s, answers));

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      const firstBad = steps.findIndex(
        (s) => Object.keys(validateStep(s, answers)).length > 0
      );
      if (firstBad >= 0) setStepIndex(firstBad);
      return;
    }

    start(async () => {
      try {
        await submitProject(answers);
        router.push('/start/success');
      } catch (err) {
        setErrors({
          email: err instanceof Error ? err.message : 'Submission failed',
        });
      }
    });
  };

  return (
    <StepShell
      index={stepIndex}
      total={total}
      title={isReview ? 'Review' : step.title}
      question={isReview ? 'Ready to send?' : resolveQuestion(step, answers)}
      hint={isReview ? 'Check the details below.' : resolveHint(step, answers)}
      onBack={stepIndex > 0 ? back : undefined}
      onNext={next}
      nextLabel={isReview ? 'Submit project' : 'Continue'}
      loading={pending}>
      {isReview ? (
        <ReviewStep answers={answers} />
      ) : step.id === 'contact' ? (
        <ContactFields
          values={{
            name: answers.name ?? '',
            email: answers.email ?? '',
            phone: answers.phone ?? '',
          }}
          errors={errors}
          onChange={(patch) =>
            Object.entries(patch).forEach(([k, v]) =>
              setField(k as keyof ProjectAnswers, v)
            )
          }
        />
      ) : step.id === 'website' ? (
        <UrlField
          value={answers.website ?? ''}
          error={errors.website}
          onChange={(v) => setField('website', v)}
          onBlur={() => {
            const err = validateUrl(answers.website ?? '');
            setErrors((e) => ({...e, website: err ?? undefined}));
          }}
        />
      ) : step.id === 'projectTypeOther' ? (
        <textarea
          rows={4}
          value={answers.projectTypeOther ?? ''}
          onChange={(e) => setField('projectTypeOther', e.target.value)}
          placeholder={step.placeholder}
          className="w-full resize-y rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-gray-900 dark:border-gray-700 dark:focus:border-gray-100"
        />
      ) : (
        <ChoiceGrid
          multiple={step.type === 'multi'}
          options={step.options}
          groups={step.optionGroups}
          value={
            step.type === 'multi'
              ? ((answers[step.answerKey] as string[]) ?? [])
              : ((answers[step.answerKey] as string) ?? '')
          }
          onChange={(v) =>
            setField(step.answerKey, v as ProjectAnswers[typeof step.answerKey])
          }
          error={errors[step.answerKey]}
        />
      )}
    </StepShell>
  );
}
