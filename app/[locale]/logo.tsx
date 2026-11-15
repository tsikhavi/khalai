import { motion } from "framer-motion";

export default function Logo (){
    return(
        <svg
          viewBox="0 0 420 120"
          className="w-[min(80vw,420px)] h-auto"
          fill="none">
          {/* KHALAI — letter paths drawn with stroke animation */}
          <g
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-laurel-700 dark:text-laurel-300">
            {/* K */}
            <motion.path
              d="M 20 20 L 20 100 M 20 60 L 55 20 M 20 60 L 55 100"
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{duration: 1.2, ease: [0.6, 0.05, 0.3, 1]}}
            />
            {/* H */}
            <motion.path
              d="M 75 20 L 75 100 M 75 60 L 110 60 M 110 20 L 110 100"
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{
                duration: 1.2,
                delay: 0.15,
                ease: [0.6, 0.05, 0.3, 1],
              }}
            />
            {/* A */}
            <motion.path
              d="M 130 100 L 148 20 L 166 100 M 137 72 L 159 72"
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.6, 0.05, 0.3, 1],
              }}
            />
            {/* L */}
            <motion.path
              d="M 186 20 L 186 100 L 218 100"
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{
                duration: 1.2,
                delay: 0.45,
                ease: [0.6, 0.05, 0.3, 1],
              }}
            />
            {/* A */}
            <motion.path
              d="M 240 100 L 258 20 L 276 100 M 247 72 L 269 72"
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{
                duration: 1.2,
                delay: 0.6,
                ease: [0.6, 0.05, 0.3, 1],
              }}
            />
            {/* I */}
            <motion.path
              d="M 296 20 L 296 100"
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{
                duration: 1.2,
                delay: 0.75,
                ease: [0.6, 0.05, 0.3, 1],
              }}
            />
          </g>

          {/* STUDIO — small caps below */}
          <motion.g
            initial={{opacity: 0, y: 4}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 1.0, ease: 'easeOut'}}>
            <text
              x="296"
              y="116"
              textAnchor="end"
              className="fill-foreground/40 font-sans text-[10px] uppercase tracking-[0.4em]">
              Studio
            </text>
          </motion.g>
        </svg>
    )
}