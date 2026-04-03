import React from 'react';
import { motion } from 'framer-motion';
import { User, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Investor {
  id: string;
  name: string;
  philosophy: string;
  portfolioValue: number;
  returnPercentage: number;
  strategyLabel: string;
  avatarUrl?: string;
}

interface CompetitorBoardProps {
  investors: Investor[];
  userPortfolioValue: number;
  userReturnPercentage: number;
}

export const CompetitorBoard: React.FC<CompetitorBoardProps> = ({ investors, userPortfolioValue, userReturnPercentage }) => {
  const allCompetitors = [
    {
      id: 'user',
      name: 'You',
      philosophy: 'Your Strategy',
      portfolioValue: userPortfolioValue,
      returnPercentage: userReturnPercentage,
      strategyLabel: 'Active',
      isUser: true
    },
    ...investors
  ].sort((a, b) => b.returnPercentage - a.returnPercentage);

  const getReturnColor = (val: number) => {
    if (val > 0) return 'text-[var(--sepia)]';
    if (val < 0) return 'text-[var(--rust)]';
    return 'text-[var(--ink)] opacity-70';
  };

  const getReturnIcon = (val: number) => {
    if (val > 0) return <TrendingUp className="w-3 h-3 text-[var(--sepia)]" />;
    if (val < 0) return <TrendingDown className="w-3 h-3 text-[var(--rust)]" />;
    return <Minus className="w-3 h-3 text-[var(--ink)] opacity-70" />;
  };

  return (
    <div className="newspaper-card p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b-2 border-[var(--dark-sepia)] pb-2">
        <h3 className="font-serif text-sm text-[var(--ink)] font-bold tracking-widest uppercase">Competitor Board</h3>
        <User className="w-4 h-4 text-[var(--ink)]" />
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
        {allCompetitors.map((comp, index) => (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-3 border-2 ${
              comp.isUser ? 'bg-[var(--sepia)]/10 border-[var(--dark-sepia)] shadow-sm' : 'bg-[var(--parchment)] border-[var(--tan-mid)]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-serif font-bold text-sm ${
                comp.isUser ? 'bg-[var(--dark-sepia)] text-[var(--parchment)]' : 'bg-[var(--tan-mid)] text-[var(--ink)]'
              }`}>
                {comp.avatarUrl ? (
                  <img src={comp.avatarUrl} alt={comp.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  comp.name.charAt(0)
                )}
              </div>
              <div>
                <div className="font-serif font-bold text-sm text-[var(--ink)]">{comp.name}</div>
                <div className="text-[10px] font-mono text-[var(--ink)] opacity-70 uppercase tracking-wider">{comp.strategyLabel}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-mono font-bold text-sm text-[var(--ink)]">
                ${comp.portfolioValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className={`flex items-center justify-end gap-1 text-xs font-mono font-bold ${getReturnColor(comp.returnPercentage)}`}>
                {getReturnIcon(comp.returnPercentage)}
                {comp.returnPercentage > 0 ? '+' : ''}{comp.returnPercentage.toFixed(1)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
