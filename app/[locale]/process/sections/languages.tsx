'use client';

import {motion} from 'framer-motion';

const LANGS = [
  {name: 'TypeScript', role: 'Frontend & API', accent: '#059f00'},
  {name: 'Python', role: 'Data & scripts', accent: '#006600'},
  {name: 'Go', role: 'Daemons & services', accent: '#0ad300'},
  {name: 'SQL', role: 'The source of truth', accent: '#11ff00'},
  {name: 'Rust', role: 'Perf-critical paths', accent: '#15ff00'},
  {name: 'Bash', role: 'Glue & delivery', accent: '#059f00'},
];

export default function LanguagesSection({
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

      <div className="grid grid-cols-2 gap-3">
        {LANGS.map((lang, i) => (
          <motion.div
            key={lang.name}
            initial={{opacity: 0, rotate: -6, y: 20}}
            whileInView={{opacity: 1, rotate: 0, y: 0}}
            viewport={{once: true}}
            transition={{
              delay: i * 0.1,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-xl border border-foreground/10 p-4"
            style={{backgroundColor: `${lang.accent}10`}}>
            <div
              className="mb-2 h-1.5 w-8 rounded-full"
              style={{backgroundColor: lang.accent}}
            />
            <p className="text-sm font-semibold">{lang.name}</p>
            <p className="mt-1 text-xs text-foreground/60">{lang.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
