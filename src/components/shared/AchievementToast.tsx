import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import type { Badge } from '../../utils/storage';

interface ToastItem {
  id: string;
  badge: Badge;
}

let addToastExternal: ((badge: Badge) => void) | null = null;

export function triggerAchievement(badge: Badge) {
  if (addToastExternal) addToastExternal(badge);
}

export function AchievementToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((badge: Badge) => {
    const id = `${badge.id}-${Date.now()}`;
    setToasts(prev => [...prev, { id, badge }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  useEffect(() => {
    addToastExternal = addToast;
    return () => { addToastExternal = null; };
  }, [addToast]);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 no-print">
      <AnimatePresence>
        {toasts.map(({ id, badge }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="bg-[#12141A] border border-[#00FF88] p-4 min-w-[280px] shadow-[0_0_20px_rgba(0,255,136,0.2)]"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <div className="font-display text-[#00FF88] text-xs tracking-widest uppercase">Achievement Unlocked</div>
                <div className="font-display text-white text-sm font-bold mt-0.5">{badge.name}</div>
                <div className="font-body text-[#8A8F98] text-xs mt-0.5">{badge.description}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
