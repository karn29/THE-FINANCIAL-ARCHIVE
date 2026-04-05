import { motion } from 'framer-motion';
import { getIdentity } from '../../utils/storage';

export function XPBar() {
  const identity = getIdentity();
  const level = Math.floor(identity.xp / 500) + 1;
  const xpInLevel = identity.xp % 500;
  const progress = (xpInLevel / 500) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#07080D]/95 border-b border-[#1E2028] backdrop-blur-sm no-print">
      <div className="flex items-center justify-between px-4 py-1.5 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-[#00FF88] tracking-widest uppercase">LVL {level}</span>
          <div className="w-32 h-1.5 bg-[#1E2028] relative">
            <motion.div
              className="h-full bg-[#00FF88]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <span className="font-mono text-[10px] text-[#8A8F98]">{identity.xp} XP</span>
        </div>
        <div className="flex items-center gap-4">
          {identity.streak > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-sm">🔥</span>
              <span className="font-mono text-[10px] text-[#F5A623]">{identity.streak} DAY STREAK</span>
            </div>
          )}
          <span className="font-mono text-[10px] text-[#8A8F98]">{identity.totalDecisions} DECISIONS</span>
        </div>
      </div>
    </div>
  );
}
