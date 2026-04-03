import React from 'react';
import { motion } from 'framer-motion';

interface SectorPerformance {
  [sectorName: string]: number;
}

interface SectorHeatMapProps {
  performance: SectorPerformance;
}

export const SectorHeatMap: React.FC<SectorHeatMapProps> = ({ performance }) => {
  const getBackgroundColor = (value: number) => {
    if (value <= -10) return 'bg-[var(--rust)] text-[var(--parchment)]';
    if (value < 0) return 'bg-[var(--dark-sepia)] text-[var(--parchment)]';
    if (value === 0) return 'bg-[var(--tan-mid)] text-[var(--ink)]';
    if (value < 10) return 'bg-[var(--sepia)] text-[var(--parchment)]';
    return 'bg-[var(--ink)] text-[var(--parchment)]';
  };

  return (
    <div className="p-4 newspaper-card">
      <h3 className="font-serif text-sm text-[var(--ink)] font-bold tracking-widest uppercase mb-4">Sector Heat Map</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.entries(performance).map(([sector, val]) => {
          const value = val as number;
          return (
          <motion.div
            key={sector}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col items-center justify-center p-3 border border-[var(--dark-sepia)] shadow-sm transition-colors duration-500 ${getBackgroundColor(value)}`}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xs font-medium uppercase tracking-wider mb-1 text-center">
              {sector}
            </span>
            <span className="font-mono text-sm font-bold">
              {value > 0 ? '+' : ''}{value}%
            </span>
          </motion.div>
        )})}
      </div>
    </div>
  );
};
