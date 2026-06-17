'use client';

import { motion } from 'framer-motion';

/**
 * Route level entrance transition. Next.js remounts this template on every
 * navigation, giving each page a smooth, cinematic reveal through Framer Motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
