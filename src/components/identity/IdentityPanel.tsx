import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { getIdentity } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';

export function IdentityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const identity = getIdentity();

  const navigate = useNavigate();

  const radarData = [
    { axis: 'Risk', value: identity.riskAppetite, fullMark: 100 },
    { axis: 'Innovation', value: identity.innovationBias, fullMark: 100 },
    { axis: 'Loss Tolerance', value: identity.lossTolerance, fullMark: 100 },
    { axis: 'Contrarian', value: identity.contrarianScore, fullMark: 100 },
    { axis: 'Speed', value: identity.decisionSpeed, fullMark: 100 },
    { axis: 'India Instinct', value: identity.indiaInstinct, fullMark: 100 },
  ];

  const recentDecisions = [...identity.decisions].reverse().slice(0, 15);
  const canGenerateReport = identity.simulationResults.length >= 2;

  return (
    <>
      {/* Toggle Tab */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] bg-[#12141A] border border-[#1E2028] border-r-0 px-1.5 py-6 hover:border-[#00FF88] transition-colors no-print"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#00FF88] uppercase">
          Your Profile
        </span>
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[70]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[400px] bg-[#07080D] border-l border-[#1E2028] z-[80] overflow-y-auto scanlines"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg text-white tracking-widest uppercase">Classified File</h2>
                  <button onClick={() => setIsOpen(false)} className="text-[#8A8F98] hover:text-white font-mono text-sm">X</button>
                </div>

                {/* Archetype */}
                <div className="border border-[#00FF88] p-4 mb-6 text-center">
                  <div className="font-mono text-[10px] text-[#8A8F98] tracking-widest mb-1">ARCHETYPE</div>
                  <div className="font-display text-xl text-[#00FF88] font-bold tracking-wider">{identity.archetypeLabel}</div>
                </div>

                {/* Radar Chart */}
                <div className="mb-6">
                  <div className="font-mono text-[10px] text-[#8A8F98] tracking-widest mb-2 uppercase">Financial Fingerprint</div>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#1E2028" />
                        <PolarAngleAxis dataKey="axis" tick={{ fill: '#8A8F98', fontSize: 10, fontFamily: 'IBM Plex Mono' }} />
                        <Radar
                          dataKey="value"
                          stroke="#00FF88"
                          fill="#00FF88"
                          fillOpacity={0.15}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-[#12141A] p-3 text-center">
                    <div className="font-mono text-lg text-[#00FF88]">{identity.xp}</div>
                    <div className="font-mono text-[9px] text-[#8A8F98] tracking-widest">XP</div>
                  </div>
                  <div className="bg-[#12141A] p-3 text-center">
                    <div className="font-mono text-lg text-white">{identity.totalDecisions}</div>
                    <div className="font-mono text-[9px] text-[#8A8F98] tracking-widest">DECISIONS</div>
                  </div>
                  <div className="bg-[#12141A] p-3 text-center">
                    <div className="font-mono text-lg text-[#F5A623]">{identity.badges.length}</div>
                    <div className="font-mono text-[9px] text-[#8A8F98] tracking-widest">BADGES</div>
                  </div>
                </div>

                {/* Badges */}
                {identity.badges.length > 0 && (
                  <div className="mb-6">
                    <div className="font-mono text-[10px] text-[#8A8F98] tracking-widest mb-2 uppercase">Badges</div>
                    <div className="flex flex-wrap gap-2">
                      {identity.badges.map(b => (
                        <div key={b.id} className="bg-[#12141A] border border-[#1E2028] px-3 py-1.5 flex items-center gap-2">
                          <span>{b.icon}</span>
                          <span className="font-mono text-[10px] text-white">{b.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Decision Log */}
                <div className="mb-6">
                  <div className="font-mono text-[10px] text-[#8A8F98] tracking-widest mb-2 uppercase">Decision Log</div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {recentDecisions.length === 0 && (
                      <div className="text-[#8A8F98] font-body text-sm italic">No decisions recorded yet. Enter a simulation to begin.</div>
                    )}
                    {recentDecisions.map((d, i) => (
                      <div key={i} className="bg-[#12141A] border border-[#1E2028] p-3">
                        <div className="font-mono text-[9px] text-[#00FF88] tracking-widest">{d.scenarioName}</div>
                        <div className="font-body text-xs text-[#8A8F98] mt-1 italic">{d.annotation}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Report Button */}
                <button
                  onClick={() => { setIsOpen(false); navigate('/report'); }}
                  disabled={!canGenerateReport}
                  className={`w-full py-3 font-mono text-sm tracking-widest uppercase border ${
                    canGenerateReport
                      ? 'bg-[#00FF88] text-[#07080D] border-[#00FF88] hover:bg-[#00cc6e]'
                      : 'bg-[#12141A] text-[#8A8F98] border-[#1E2028] cursor-not-allowed'
                  }`}
                >
                  {canGenerateReport ? 'Generate Investor Report' : 'Complete 2+ simulations to unlock'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
