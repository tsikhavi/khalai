'use client';

import {motion} from 'framer-motion';

const ITEMS = [
  'Terms of service',
  'Privacy policy',
  'Cookie consent',
  'GDPR · data map',
  'Licence inventory',
  'Accessibility statement',
];

export default function LegalSection({
  data,
}: {
  data: {kicker: string; title: string; body: string};
}) {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
      <motion.div
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true, amount: 0.4}}
        transition={{duration: 0.8, delay: 0.2}}
        className="order-2 flex justify-center md:order-1">
        <ul className="w-full max-w-md space-y-3">
          {ITEMS.map((item, i) => (
            <motion.li
              key={item}
              initial={{opacity: 0, x: -12}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{delay: i * 0.08, duration: 0.5}}
              className="flex items-center gap-3 rounded-lg border border-foreground/10 px-4 py-3">
              <motion.span
                initial={{scale: 0}}
                whileInView={{scale: 1}}
                viewport={{once: true}}
                transition={{
                  delay: 0.3 + i * 0.08,
                  type: 'spring',
                  stiffness: 260,
                  damping: 18,
                }}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-laurel-500 text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3">
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
              <span className="text-sm">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.4}}
        transition={{duration: 0.6}}
        className="order-1 md:order-2">
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
    </div>
  );
}
