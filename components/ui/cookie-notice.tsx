'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from './button';

const KEY = 'premora-cookie-consent';

export function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* ignore */
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-2xl rounded-xl border border-gold/20 bg-panel/95 p-4 shadow-card-hover backdrop-blur sm:inset-x-auto sm:start-5"
          role="dialog"
          aria-label="Cookie notice"
        >
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <p className="flex-1 text-xs leading-relaxed text-muted">
              We use essential cookies to make Premora work and to understand how
              the site is used. By continuing you agree to our use of cookies.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={dismiss}>
                Decline
              </Button>
              <Button variant="gold" size="sm" onClick={dismiss}>
                Accept
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
