'use server';

import {apiFetch} from '@/lib/api-server';
import {ProjectAnswers} from '@/[locale]/start/steps';
import {validateAll} from '@/lib/validation';
import {normalizeUrl} from '@/lib/validation';

export async function submitProject(answers: ProjectAnswers) {
  const errors = validateAll(answers);
  if (Object.keys(errors).length > 0) {
    throw new Error('Please complete all steps.');
  }

  const website = answers.website ? normalizeUrl(answers.website) : null;

  await apiFetch('/projects', {
    method: 'POST',
    json: {
      techLevel: answers.techLevel,
      projectType: answers.projectType,
      projectTypeOther:
        answers.projectType === 'other'
          ? answers.projectTypeOther?.trim()
          : undefined,
      goal: answers.goal,
      scope: answers.scope,
      platform: answers.platform,
      budget: answers.budget,
      timeline: answers.timeline,
      website,
      name: answers.name?.trim(),
      email: answers.email?.trim().toLowerCase(),
      phone: answers.phone?.trim() || undefined,
    },
  });

  return {ok: true};
}
