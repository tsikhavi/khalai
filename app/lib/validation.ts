import {visibleSteps} from '@/[locale]/start/steps';
import {ProjectAnswers, StepDef} from '@/[locale]/start/steps';

export interface FieldErrors {
  [field: string]: string;
}

export function validateEmail(email: string): string | null {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email';
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone) return null; // optional
  if (!/^\+?[\d\s\-()]{7,20}$/.test(phone)) return 'Enter a valid phone number';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (!/[A-Z]/.test(password)) return 'Add an uppercase letter';
  if (!/[0-9]/.test(password)) return 'Add a number';
  return null;
}

export function validateName(name: string): string | null {
  if (!name) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  return null;
}

export function validateAge(age: string | number): string | null {
  const n = Number(age);
  if (!age) return 'Age is required';
  if (isNaN(n)) return 'Age must be a number';
  if (n < 18) return 'You must be at least 18 years old';
  if (n > 150) return 'Enter a valid age';
  return null;
}

export function validateRegisterForm(data: {
  name: string;
  email: string;
  phone: string;
  age: string;
  password: string;
  confirmPassword: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  const name = validateName(data.name);
  const email = validateEmail(data.email);
  const phone = validatePhone(data.phone);
  const age = validateAge(data.age);
  const password = validatePassword(data.password);

  if (name) errors.name = name;
  if (email) errors.email = email;
  if (phone) errors.phone = phone;
  if (age) errors.age = age;
  if (password) errors.password = password;
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
}

export function validateLoginForm(data: {
  identifier: string;
  password: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.identifier) {
    errors.identifier = 'Email or phone is required';
  } else if (data.identifier.includes('@') && validateEmail(data.identifier)) {
    errors.identifier = 'Enter a valid email';
  } else if (!data.identifier.includes('@') && validatePhone(data.identifier)) {
    errors.identifier = 'Enter a valid email or phone';
  }
  if (!data.password) errors.password = 'Password is required';
  return errors;
}

export function validateUrl(
  value: string,
  {required = false}: {required?: boolean} = {}
): string | null {
  const v = value.trim();
  if (!v) return required ? 'Website is required.' : null;

  // Reject if it has spaces
  if (/\s/.test(v)) return 'URL cannot contain spaces.';

  // Normalize: prepend https:// if no scheme
  const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;

  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return 'Enter a valid URL (e.g. https://example.co.ke).';
  }

  // Only http/https
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return 'Only http and https links are supported.';
  }

  // Must have a hostname with a dot and a valid TLD (2–24 letters)
  const host = url.hostname;
  if (!/^[a-z0-9.-]+\.[a-z]{2,24}$/i.test(host)) {
    return 'Enter a full domain (e.g. example.co.ke).';
  }

  // Reject localhost / private IPs (optional — remove if you want to allow intranets)
  if (
    host === 'localhost' ||
    /^127\./.test(host) ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host)
  ) {
    return 'Enter a public website address.';
  }

  return null;
}

/** Normalize a validated URL for storage — always http(s) scheme. */
export function normalizeUrl(value: string): string | null {
  const v = value.trim();
  if (!v) return null;
  const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(withScheme);
    // Drop trailing slash on root paths for consistency
    if (u.pathname === '/') return `${u.protocol}//${u.host}`;
    return u.toString();
  } catch {
    return null;
  }
}

export type StepErrors = Partial<Record<keyof ProjectAnswers, string>>;

export function validateStep(
  step: StepDef,
  answers: ProjectAnswers
): StepErrors {
  const errors: StepErrors = {};

  switch (step.id) {
    case 'audience': {
      if (!answers.techLevel) errors.techLevel = 'Please pick one.';
      break;
    }

    case 'projectType': {
      if (!answers.projectType) errors.projectType = 'Pick a category.';
      break;
    }

    case 'projectTypeOther': {
      const t = answers.projectTypeOther?.trim() ?? '';
      if (!t) errors.projectTypeOther = 'Please describe your project.';
      else if (t.length < 10)
        errors.projectTypeOther = 'A little more detail, please.';
      else if (t.length > 500)
        errors.projectTypeOther = 'Too long — keep it under 500 characters.';
      break;
    }

    case 'goal': {
      if (!answers.goal) errors.goal = 'Pick one option.';
      break;
    }

    case 'scope': {
      if (!answers.scope?.length) errors.scope = 'Pick at least one.';
      else if (answers.scope.length > 8)
        errors.scope = 'Too many — narrow it down.';
      break;
    }

    case 'platform': {
      if (!answers.platform?.length) errors.platform = 'Pick at least one.';
      break;
    }

    case 'budget': {
      if (!answers.budget) errors.budget = 'Pick a range.';
      break;
    }

    case 'timeline': {
      if (!answers.timeline) errors.timeline = 'Pick a timeline.';
      break;
    }

    case 'website': {
      const err = validateUrl(answers.website ?? '', {required: false});
      if (err) errors.website = err;
      break;
    }

    case 'contact': {
      const name = answers.name?.trim() ?? '';
      const email = answers.email?.trim() ?? '';
      const phone = answers.phone?.trim() ?? '';

      if (!name) errors.name = 'Name is required.';
      else if (name.length < 2) errors.name = 'At least 2 characters.';

      if (!email) errors.email = 'Email is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Enter a valid email.';
      }

      if (phone && !/^\+?[\d\s\-()]{7,20}$/.test(phone)) {
        errors.phone = 'Enter a valid phone number.';
      }
      break;
    }
  }

  return errors;
}

export function validateAll(answers: ProjectAnswers): StepErrors {
  const all: StepErrors = {};
  for (const step of visibleSteps(answers)) {
    Object.assign(all, validateStep(step, answers));
  }
  return all;
}
