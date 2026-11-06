'use client';

import {motion} from 'framer-motion';

const BEFORE = [
  'function getUser(id) {',
  '  let u = db.query("select * from users where id=" + id);',
  '  if (!u) return null;',
  '  return u;',
  '}',
];

const AFTER = [
  'async function getUser(id: string): Promise<User | null> {',
  '  if (!id) return null;',
  '  return db.user.findUnique({ where: { id } });',
  '}',
];

export default function RefactoringSection({
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

      <div className="grid gap-4">
        {/* Before */}
        <motion.div
          initial={{opacity: 0, y: 12}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.6}}
          className="rounded-xl border border-foreground/10 bg-foreground/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-foreground/50">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            Before
          </div>
          <pre className="overflow-x-auto text-[11px] leading-relaxed text-foreground/70">
            <code>
              {BEFORE.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </code>
          </pre>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{opacity: 0, scale: 0}}
          whileInView={{opacity: 1, scale: 1}}
          viewport={{once: true}}
          transition={{delay: 0.4, duration: 0.4}}
          className="flex justify-center text-laurel-500">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <path
              d="M12 5v14M6 13l6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{opacity: 0, y: 12}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{delay: 0.6, duration: 0.6}}
          className="rounded-xl border border-laurel-500/30 bg-laurel-500/5 p-4">
          <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-laurel-700 dark:text-laurel-300">
            <span className="h-1.5 w-1.5 rounded-full bg-laurel-500" />
            After
          </div>
          <pre className="overflow-x-auto text-[11px] leading-relaxed text-foreground/80">
            <code>
              {AFTER.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </code>
          </pre>
        </motion.div>
      </div>
    </div>
  );
}
