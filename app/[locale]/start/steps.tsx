export type StepId =
  | 'audience'
  | 'projectType'
  | 'projectTypeOther'
  | 'goal'
  | 'scope'
  | 'platform'
  | 'budget'
  | 'timeline'
  | 'website'
  | 'contact';

export type TechLevel = 'beginner' | 'some' | 'confident';

export type Option = {value: string; label: string; hint?: string};

export type StepDef = {
  id: StepId;
  title: string;
  answerKey: keyof ProjectAnswers;
  /** Question text — may differ per audience via `questionByLevel` */
  question: string;
  questionByLevel?: Partial<Record<TechLevel, string>>;
  hint?: string;
  hintByLevel?: Partial<Record<TechLevel, string>>;
  type: 'single' | 'multi' | 'text' | 'email' | 'phone' | 'url' | 'number';
  options?: Option[];
  /** Groups inside a multi-step — rendered with section headers */
  optionGroups?: {label: string; options: Option[]}[];
  required?: boolean;
  placeholder?: string;
  showIf?: (a: ProjectAnswers) => boolean;
};

export type ProjectAnswers = {
  // audience
  techLevel?: TechLevel;
  // project
  projectType?: string;
  projectTypeOther?: string;
  goal?: string;
  scope?: string[];
  platform?: string[];
  budget?: string;
  timeline?: string;
  // contact
  website?: string;
  name?: string;
  email?: string;
  phone?: string;
};

/* ------------------------------------------------------------------ */
/*  Project types — grouped, plain language                            */
/* ------------------------------------------------------------------ */
const PROJECT_TYPE_GROUPS: {label: string; options: Option[]}[] = [
  {
    label: 'Business & commerce',
    options: [
      {
        value: 'local-shop',
        label: 'Online shop for my business',
        hint: 'Sell products online, take orders, M-Pesa payment',
      },
      {
        value: 'booking',
        label: 'Bookings & appointments',
        hint: 'Let customers book time with you',
      },
      {
        value: 'invoicing',
        label: 'Invoices & receipts',
        hint: 'Send bills and track who has paid',
      },
      {
        value: 'loyalty',
        label: 'Customer loyalty program',
        hint: 'Reward repeat customers',
      },
    ],
  },
  {
    label: 'Money & payments',
    options: [
      {
        value: 'fintech',
        label: 'Fintech solution',
        hint: 'Payments, wallets, loans, savings groups (chama)',
      },
      {
        value: 'mpesa',
        label: 'M-Pesa or mobile money',
        hint: 'Accept or send money via phone',
      },
      {
        value: 'sacco',
        label: 'SACCO or chama management',
        hint: 'Track member contributions and loans',
      },
      {
        value: 'payroll',
        label: 'Payroll & staff payments',
        hint: 'Pay employees on time, calculate deductions',
      },
    ],
  },
  {
    label: 'Education',
    options: [
      {
        value: 'school-portal',
        label: 'School portal',
        hint: 'For students, parents, and teachers',
      },
      {
        value: 'lms',
        label: 'Online learning platform',
        hint: 'Courses, videos, quizzes, certificates',
      },
      {
        value: 'school-fees',
        label: 'School fees tracking',
        hint: 'Record payments per student, send reminders',
      },
      {
        value: 'exam-bank',
        label: 'Exam question bank',
        hint: 'Store and reuse past exams',
      },
    ],
  },
  {
    label: 'Farming & environment',
    options: [
      {
        value: 'agritech',
        label: 'Agritech solution',
        hint: 'Help farmers track crops, weather, or market prices',
      },
      {
        value: 'farm-market',
        label: 'Farm-to-market platform',
        hint: 'Connect farmers directly with buyers',
      },
      {
        value: 'livestock',
        label: 'Livestock management',
        hint: 'Track animals, breeding, health records',
      },
      {
        value: 'solar',
        label: 'Solar energy solution',
        hint: 'Solar sales, installation tracking, monitoring',
      },
      {
        value: 'water',
        label: 'Water & irrigation',
        hint: 'Monitor tanks, irrigation schedules',
      },
    ],
  },
  {
    label: 'Community & services',
    options: [
      {
        value: 'health',
        label: 'Clinic or pharmacy system',
        hint: 'Patient records, prescriptions, stock',
      },
      {
        value: 'transport',
        label: 'Transport & logistics',
        hint: 'Track vehicles, deliveries, drivers',
      },
      {
        value: 'property',
        label: 'Property & rentals',
        hint: 'List houses, collect rent, track tenants',
      },
      {
        value: 'events',
        label: 'Events & ticketing',
        hint: 'Sell tickets, check in guests',
      },
      {
        value: 'ngo',
        label: 'NGO or community project',
        hint: 'Track beneficiaries, donations, reports',
      },
    ],
  },
  {
    label: 'Something else',
    options: [
      {
        value: 'other',
        label: 'Other — I will describe it',
        hint: 'We will ask for a short description',
      },
    ],
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Steps                                                              */
/* ------------------------------------------------------------------ */
export const STEPS: StepDef[] = [
  // ─── 1. AUDIENCE ───────────────────────────────────────────────
  {
    id: 'audience',
    title: 'About you',
    answerKey: 'techLevel',
    question: 'How comfortable are you with technology?',
    hint: "There's no wrong answer — this just helps us explain things the right way.",
    type: 'single',
    required: true,
    options: [
      {
        value: 'beginner',
        label: "I'm new to this",
        hint: 'Plain language, no jargon, step-by-step guidance',
      },
      {
        value: 'some',
        label: 'I know some basics',
        hint: 'I use apps and websites daily but not technical',
      },
      {
        value: 'confident',
        label: "I'm tech-savvy",
        hint: 'Comfortable with technical terms and details',
      },
    ],
  },

  // ─── 2. PROJECT TYPE ───────────────────────────────────────────
  {
    id: 'projectType',
    answerKey: 'projectType',
    title: 'Project',
    questionByLevel: {
      beginner: 'What do you want to build?',
      some: 'What kind of project is this?',
      confident: 'What type of solution are you building?',
    },
    question: 'What do you want to build?',
    hintByLevel: {
      beginner:
        'Pick whatever sounds closest. You can describe it in your own words next.',
      some: 'Pick the closest match. Add more detail in the next step.',
      confident: 'Choose the primary category. You can add nuance later.',
    },
    type: 'single',
    required: true,
    optionGroups: PROJECT_TYPE_GROUPS,
    showIf: (a) => a.projectType === 'other',
  },
  {
    id: 'projectType',
    answerKey: 'projectTypeOther',
    title: 'Describe it',
    questionByLevel: {
      beginner: 'Tell us in your own words what you want',
      some: 'Describe your project',
      confident: 'Describe the solution in a sentence or two',
    },
    question: 'Describe your project',
    hintByLevel: {
      beginner:
        'Example: "I want a website where my customers can order and pay using M-Pesa."',
      some: 'A short description is fine.',
      confident: 'Include the core value proposition if you can.',
    },
    type: 'text',
    required: true,
    showIf: (a) => a.projectType === 'other',
    placeholder: 'Describe it in your own words…',
  },

  // ─── 3. GOAL ───────────────────────────────────────────────────
  {
    id: 'goal',
    answerKey: 'goal',

    title: 'Goal',
    questionByLevel: {
      beginner: 'What do you want this to do for you?',
      some: 'What is the main goal?',
      confident: 'Primary objective?',
    },
    question: 'What is the main goal?',
    hintByLevel: {
      beginner: 'Think about the problem you want solved, not the features.',
      some: 'What outcome matters most?',
      confident: 'Primary success metric or outcome.',
    },
    type: 'single',
    required: true,
    options: [
      {
        value: 'new-product',
        label: 'Start something new',
        hint: 'Launch a product or service',
      },
      {
        value: 'grow',
        label: 'Grow my current business',
        hint: 'More customers, more sales',
      },
      {
        value: 'save-time',
        label: 'Save time on manual work',
        hint: 'Replace paper, spreadsheets, WhatsApp',
      },
      {
        value: 'reach',
        label: 'Reach more people',
        hint: 'Go beyond my current location',
      },
      {
        value: 'organize',
        label: 'Organize my records',
        hint: 'Stop losing data in notebooks',
      },
      {value: 'other-goal', label: 'Something else'},
    ],
  },

  // ─── 4. SCOPE ──────────────────────────────────────────────────
  {
    id: 'scope',
    answerKey: 'scope',

    title: 'Scope',
    questionByLevel: {
      beginner: 'What parts do you need help with?',
      some: 'Which parts do you need?',
      confident: 'Required capabilities?',
    },
    question: 'Which parts do you need?',
    hintByLevel: {
      beginner: "Pick as many as you think you need — we'll help you decide.",
      some: 'Pick as many as apply.',
      confident: 'Select all that apply.',
    },
    type: 'multi',
    required: true,
    options: [
      {value: 'design', label: 'Design', hint: 'How it looks and feels'},
      {
        value: 'frontend',
        label: 'Customer-facing app',
        hint: 'What your users see and use',
      },
      {
        value: 'backend',
        label: 'Backend system',
        hint: 'Data, accounts, business logic',
      },
      {value: 'mobile', label: 'Mobile app', hint: 'Android and/or iOS'},
      {value: 'payments', label: 'Payments', hint: 'M-Pesa, card, bank'},
      {
        value: 'data',
        label: 'Reports & analytics',
        hint: 'Dashboards and insights',
      },
      {
        value: 'hosting',
        label: 'Hosting & deployment',
        hint: 'Servers, domains, SSL',
      },
      {
        value: 'support',
        label: 'Training & support',
        hint: 'Teach your team how to use it',
      },
    ],
  },

  // ─── 5. PLATFORM ───────────────────────────────────────────────
  {
    id: 'platform',
    title: 'Platform',
    answerKey: 'platform',

    questionByLevel: {
      beginner: 'Where will people use it?',
      some: 'Where should it work?',
      confident: 'Target platforms?',
    },
    question: 'Where will people use it?',
    hintByLevel: {
      beginner:
        "Most projects start with a website — it's the cheapest and quickest to launch.",
      some: 'Pick all that apply.',
      confident: 'Select all target platforms.',
    },
    type: 'multi',
    required: true,
    options: [
      {value: 'web', label: 'Website', hint: 'Works in any browser'},
      {value: 'android', label: 'Android app', hint: 'Play Store'},
      {value: 'ios', label: 'iPhone app', hint: 'App Store'},
      {value: 'ussd', label: 'USSD / SMS', hint: 'Works on any phone'},
      {value: 'whatsapp', label: 'WhatsApp bot', hint: 'Chat with customers'},
      {
        value: 'offline',
        label: 'Works without internet',
        hint: 'Rural areas, low data',
      },
    ],
  },

  // ─── 6. BUDGET ─────────────────────────────────────────────────
  {
    id: 'budget',
    answerKey: 'budget',

    title: 'Budget',
    questionByLevel: {
      beginner: 'How much are you thinking of spending?',
      some: 'What is your budget range?',
      confident: 'Budget bracket?',
    },
    question: 'What is your budget range?',
    hintByLevel: {
      beginner:
        "It's okay to say you're not sure — we'll help you figure it out.",
      some: 'Rough estimate is fine.',
      confident: 'Total engagement budget.',
    },
    type: 'single',
    required: true,
    options: [
      {value: 'lt-50k', label: 'Under KES 50,000'},
      {value: '50-200k', label: 'KES 50,000 – 200,000'},
      {value: '200-500k', label: 'KES 200,000 – 500,000'},
      {value: 'gt-500k', label: 'Over KES 500,000'},
      {value: 'unsure', label: "I'm not sure yet"},
    ],
  },

  // ─── 7. TIMELINE ───────────────────────────────────────────────
  {
    id: 'timeline',
    answerKey: 'timeline',

    title: 'Timeline',
    questionByLevel: {
      beginner: 'When do you need it ready?',
      some: 'When do you need it?',
      confident: 'Target delivery window?',
    },
    question: 'When do you need it?',
    type: 'single',
    required: true,
    options: [
      {value: 'asap', label: 'As soon as possible'},
      {value: '1-3mo', label: 'In 1–3 months'},
      {value: '3-6mo', label: 'In 3–6 months'},
      {value: 'flex', label: 'Flexible'},
    ],
  },

  // ─── 8. WEBSITE (optional) ─────────────────────────────────────
  {
    id: 'website',
    answerKey: 'website',

    title: 'Existing site',
    questionByLevel: {
      beginner: 'Do you already have a website?',
      some: 'Do you have an existing website?',
      confident: 'Existing website URL?',
    },
    question: 'Do you have a website?',
    hintByLevel: {
      beginner:
        "If you're not sure, just leave it blank — we'll help you check.",
      some: 'Optional. Include the full link (https://…).',
      confident: 'Optional. Full URL including protocol.',
    },
    type: 'url',
    required: false,
    placeholder: 'https://example.co.ke',
  },

  // ─── 9. CONTACT ────────────────────────────────────────────────
  {
    id: 'contact',
    answerKey: 'name',
    title: 'Contact',
    questionByLevel: {
      beginner: 'How can we reach you?',
      some: 'Where can we reach you?',
      confident: 'Contact details?',
    },
    question: 'Where can we reach you?',
    type: 'text', // custom-rendered
    required: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
export function visibleSteps(answers: ProjectAnswers): StepDef[] {
  return STEPS.filter((s) => !s.showIf || s.showIf(answers));
}

export function resolveQuestion(step: StepDef, a: ProjectAnswers): string {
  const lvl = a.techLevel;
  if (lvl && step.questionByLevel?.[lvl]) return step.questionByLevel[lvl]!;
  return step.question;
}

export function resolveHint(
  step: StepDef,
  a: ProjectAnswers
): string | undefined {
  const lvl = a.techLevel;
  if (lvl && step.hintByLevel?.[lvl]) return step.hintByLevel[lvl];
  return step.hint;
}
