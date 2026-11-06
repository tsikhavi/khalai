'use client';

import {motion} from 'framer-motion';

export default function AiDevSection({
  data,
}: {
  data: {kicker: string; title: string; body: string};
}) {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
      <motion.div
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.4}}
        transition={{duration: 0.6}}>
        <p className="text-xs uppercase tracking-[0.3em] text-laurel-700 dark:text-laurel-300">
          {data.kicker}
        </p>
        <h2 className="mt-3 font-serif text-5xl leading-tight md:text-7xl">
          {data.title}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/70">
          {data.body}
        </p>
      </motion.div>

      <div className="space-y-4">
        {[
          {
            label: 'Prompt',
            text: 'Draft a login form with email + password',
            accent: '#006600',
          },
          {
            label: 'Draft',
            text: 'Two-file component, tests stubbed',
            accent: '#0ad300',
          },
          {
            label: 'Review',
            text: 'Human adjusts layout, tone, a11y',
            accent: '#11ff00',
          },
          {
            label: 'Ship',
            text: 'Preview deployed to staging',
            accent: '#059f00',
          },
        ].map((step, i) => (
          <motion.div
            key={step.label}
            initial={{opacity: 0, x: -20}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{
              delay: i * 0.12,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-lg border border-foreground/10 p-4">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{backgroundColor: step.accent}}
              />
              <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                {step.label}
              </span>
            </div>
            <p className="mt-2 text-sm">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
