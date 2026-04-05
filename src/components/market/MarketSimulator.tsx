import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import { marketScenarios } from '../../data/market';
import type { MarketScenario, MarketChoice } from '../../data/market';
import { addDecision, addSimulationResult, addBadge, addToLeaderboard, getLeaderboard, getIdentity } from '../../utils/storage';
import { triggerAchievement } from '../shared/AchievementToast';
import { MarketDebrief } from './MarketDebrief';

function FearGreedGauge({ value }: { value: number }) {
  const angle = -90 + (value / 100) * 180;
  const color = value > 60 ? '#00FF88' : value > 40 ? '#F5A623' : '#FF2D55';
  const label = value > 75 ? 'EXTREME GREED' : value > 60 ? 'GREED' : value > 40 ? 'NEUTRAL' : value > 25 ? 'FEAR' : 'EXTREME FEAR';

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-48">
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF2D55" />
            <stop offset="50%" stopColor="#F5A623" />
            <stop offset="100%" stopColor="#00FF88" />
          </linearGradient>
        </defs>
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#1E2028" strokeWidth="12" strokeLinecap="round" />
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#gaugeGrad)" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(value / 100) * 251} 251`} />
        <line
          x1="100" y1="100"
          x2={100 + 60 * Math.cos((angle * Math.PI) / 180)}
          y2={100 + 60 * Math.sin((angle * Math.PI) / 180)}
          stroke={color} strokeWidth="3" strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="4" fill={color} />
      </svg>
      <div className="font-mono text-xs mt-1" style={{ color }}>{label}</div>
      <div className="font-mono text-2xl font-bold mt-1" style={{ color }}>{value}</div>
    </div>
  );
}

function SectorHeatMap({ sectors }: { sectors: { name: string; momentum: number }[] }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {sectors.map(s => {
        const color = s.momentum > 60 ? '#00FF88' : s.momentum > 40 ? '#F5A623' : '#FF2D55';
        const bg = s.momentum > 60 ? 'rgba(0,255,136,0.1)' : s.momentum > 40 ? 'rgba(245,166,35,0.1)' : 'rgba(255,45,85,0.1)';
        return (
          <div key={s.name} className="p-2 border border-[#1E2028] text-center" style={{ backgroundColor: bg }}>
            <div className="font-mono text-[9px] text-[#8A8F98] tracking-wider">{s.name.toUpperCase()}</div>
            <div className="font-mono text-sm font-bold mt-1" style={{ color }}>{s.momentum}</div>
          </div>
        );
      })}
    </div>
  );
}

export function MarketSelector() {
  const navigate = useNavigate();
  const leaderboards = marketScenarios.map(s => ({ id: s.id, entries: getLeaderboard(s.id) }));

  return (
    <div className="min-h-screen bg-[#07080D] pt-12 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('/')} className="font-mono text-xs text-[#8A8F98] hover:text-[#00FF88] mb-8 block tracking-widest">
          {'<'} BACK TO HQ
        </button>
        <h1 className="font-display text-4xl text-white tracking-widest uppercase mb-2">Market Simulator</h1>
        <p className="font-body text-[#8A8F98] mb-12">Classified Dossiers. Choose your crisis.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketScenarios.map((scenario, i) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/market/${scenario.id}`)}
              className="bg-[#12141A] border border-[#1E2028] p-6 cursor-pointer hover:border-[#00FF88] transition-all group scanlines relative overflow-hidden"
            >
              <div className="absolute top-3 right-3 font-mono text-[40px] font-extrabold text-white/[0.03] select-none">{scenario.year}</div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[#F5A623] text-sm font-bold">{scenario.year}</span>
                <span className={`pill-badge ${scenario.threatLevel === 'EXTREME' ? 'bg-[#FF2D55]/20 text-[#FF2D55]' : scenario.threatLevel === 'CRITICAL' ? 'bg-[#F5A623]/20 text-[#F5A623]' : 'bg-[#F5A623]/20 text-[#F5A623]'}`}>
                  {scenario.threatLevel}
                </span>
              </div>
              <h3 className="font-display text-xl text-white font-bold mb-2 group-hover:text-[#00FF88] transition-colors">{scenario.name}</h3>
              <p className="font-body text-[#8A8F98] text-sm mb-4">{scenario.hook}</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#8A8F98] tracking-widest">CLASSIFIED DOSSIER</span>
                <span className="font-mono text-xs text-[#00FF88] opacity-0 group-hover:opacity-100 transition-opacity">ENTER {'>'}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leaderboards */}
        <div className="mt-16">
          <h2 className="font-display text-2xl text-white tracking-widest uppercase mb-6">Leaderboards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leaderboards.map(lb => {
              const scenario = marketScenarios.find(s => s.id === lb.id)!;
              return (
                <div key={lb.id} className="bg-[#12141A] border border-[#1E2028] p-5 scanlines">
                  <div className="font-display text-sm text-white tracking-widest uppercase mb-3">{scenario.name} ({scenario.year})</div>
                  <div className="space-y-1">
                    {lb.entries.slice(0, 5).map((entry, i) => (
                      <div key={i} className="flex items-center justify-between font-mono text-xs">
                        <span className="text-[#8A8F98]">{i + 1}. {entry.name}</span>
                        <span className={entry.returnPct >= 0 ? 'text-[#00FF88]' : 'text-[#FF2D55]'}>{entry.returnPct > 0 ? '+' : ''}{entry.returnPct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarketSimulatorGame() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scenario = marketScenarios.find(s => s.id === id);

  const [phase, setPhase] = useState<'briefing' | 'allocate' | 'events' | 'debrief'>('briefing');
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [portfolioValue, setPortfolioValue] = useState(1000000);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [decisions, setDecisions] = useState<MarketChoice[]>([]);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [showEventChoice, setShowEventChoice] = useState(true);
  const [decisionStartTime, setDecisionStartTime] = useState(Date.now());
  const [portfolioHistory, setPortfolioHistory] = useState<{ event: string; value: number }[]>([]);

  useEffect(() => {
    if (phase === 'briefing' && scenario) {
      const interval = setInterval(() => {
        setHeadlineIndex(prev => (prev + 1) % scenario.briefing.headlines.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [phase, scenario]);

  useEffect(() => {
    if (phase === 'events') {
      setDecisionStartTime(Date.now());
    }
  }, [phase, currentEventIndex]);

  const totalAllocated = Object.values(allocations).reduce((a: number, b: number) => a + b, 0);

  const handleAllocate = useCallback((companyName: string, amount: number) => {
    setAllocations(prev => {
      const newAlloc = { ...prev };
      const currentTotal = Object.entries(prev).reduce((sum: number, [k, v]) => k === companyName ? sum : sum + (v as number), 0);
      const maxAmount = 1000000 - currentTotal;
      newAlloc[companyName] = Math.min(amount, maxAmount);
      if (newAlloc[companyName] <= 0) delete newAlloc[companyName];
      return newAlloc;
    });
  }, []);

  const handleExecutePositions = () => {
    setPortfolioHistory([{ event: 'START', value: 1000000 }]);
    setPhase('events');
  };

  const handleEventChoice = (choice: MarketChoice) => {
    if (!scenario) return;

    const timeTaken = (Date.now() - decisionStartTime) / 1000;
    const speedScore = timeTaken < 5 ? 15 : timeTaken < 15 ? 5 : -10;

    const newValue = Math.round(portfolioValue * (1 + choice.portfolioImpact));
    setPortfolioValue(newValue);
    setDecisions(prev => [...prev, choice]);
    setPortfolioHistory(prev => [...prev, { event: scenario.events[currentEventIndex].title, value: newValue }]);

    addDecision({
      id: choice.id,
      scenarioId: scenario.id,
      scenarioName: scenario.name,
      scenarioType: 'market',
      choice: choice.text,
      annotation: choice.annotation,
      timestamp: Date.now(),
      impact: {
        riskAppetite: choice.riskAppetite,
        innovationBias: choice.innovationBias,
        lossTolerance: choice.lossTolerance,
        contrarianScore: choice.contrarianScore,
        decisionSpeed: choice.decisionSpeed + speedScore,
        indiaInstinct: choice.indiaInstinct,
      },
    });

    setShowEventChoice(false);

    setTimeout(() => {
      if (currentEventIndex < scenario.events.length - 1) {
        setCurrentEventIndex(prev => prev + 1);
        setShowEventChoice(true);
      } else {
        finishSimulation(newValue, [...decisions, choice]);
      }
    }, 2000);
  };

  const finishSimulation = (finalValue: number, allDecisions: MarketChoice[]) => {
    if (!scenario) return;

    const returnPct = ((finalValue - 1000000) / 1000000) * 100;
    const identity = getIdentity();

    // Determine bias
    const biasKeys = Object.keys(scenario.biases);
    let diagnosedBias = biasKeys[0];
    let biasDescription = scenario.biases[diagnosedBias];

    const avgRisk = allDecisions.reduce((s, d) => s + d.riskAppetite, 0) / allDecisions.length;
    const avgContrarian = allDecisions.reduce((s, d) => s + d.contrarianScore, 0) / allDecisions.length;

    if (avgRisk > 10) {
      diagnosedBias = 'Overconfidence';
      biasDescription = scenario.biases['Overconfidence'] || biasDescription;
    } else if (avgRisk < -10) {
      diagnosedBias = 'Loss Aversion';
      biasDescription = scenario.biases['Loss Aversion'] || biasDescription;
    } else if (avgContrarian < -5) {
      diagnosedBias = 'Herding';
      biasDescription = scenario.biases['Herding'] || scenario.biases['Herd Mentality'] || biasDescription;
    }

    addSimulationResult({
      scenarioId: scenario.id,
      scenarioName: scenario.name,
      scenarioType: 'market',
      finalReturn: returnPct,
      benchmark: 0,
      biasDiagnosed: diagnosedBias,
      biasDescription,
      archetypeLabel: identity.archetypeLabel,
      completedAt: Date.now(),
      decisions: [],
    });

    addToLeaderboard(scenario.id, {
      name: 'You',
      returnPct: Math.round(returnPct * 10) / 10,
      archetype: identity.archetypeLabel,
    });

    // Check for badges
    if (returnPct < -30 && avgContrarian > 5) {
      const badge = { id: 'smart-loser', name: 'SMART LOSER', description: 'You lost the bet but won the thinking.', icon: '\uD83E\uDDE0', earnedAt: Date.now() };
      addBadge(badge);
      triggerAchievement(badge);
    }
    if (avgContrarian > 15 && returnPct > 0) {
      const badge = { id: 'contrarian-hawk', name: 'CONTRARIAN HAWK', description: 'You bet against consensus and won.', icon: '\uD83E\uDD85', earnedAt: Date.now() };
      addBadge(badge);
      triggerAchievement(badge);
    }
    if (returnPct > 0 && allDecisions.some(d => d.lossTolerance > 15)) {
      const badge = { id: 'black-swan-survivor', name: 'BLACK SWAN SURVIVOR', description: 'You held through a massive drawdown.', icon: '\uD83E\uDDA2', earnedAt: Date.now() };
      addBadge(badge);
      triggerAchievement(badge);
    }
    if (scenario.id.includes('india') || scenario.id.includes('1991') || scenario.id.includes('1992')) {
      const badge = { id: 'india-player', name: 'INDIA OPERATOR', description: 'Completed an Indian market scenario.', icon: '\uD83C\uDDEE\uD83C\uDDF3', earnedAt: Date.now() };
      addBadge(badge);
      triggerAchievement(badge);
    }

    setPhase('debrief');
  };

  if (!scenario) {
    return (
      <div className="min-h-screen bg-[#07080D] flex items-center justify-center">
        <div className="text-center">
          <div className="font-display text-2xl text-white mb-4">Scenario Not Found</div>
          <button onClick={() => navigate('/market')} className="font-mono text-sm text-[#00FF88]">{'<'} Back to Market</button>
        </div>
      </div>
    );
  }

  // BRIEFING PHASE
  if (phase === 'briefing') {
    return (
      <div className="min-h-screen bg-[#07080D] pt-12 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <button onClick={() => navigate('/market')} className="font-mono text-xs text-[#8A8F98] hover:text-[#00FF88] tracking-widest mb-4 block">{'<'} ABORT MISSION</button>
            <div className="font-mono text-[10px] text-[#F5A623] tracking-widest mb-2">MISSION BRIEFING // {scenario.year}</div>
            <h1 className="font-display text-4xl text-white tracking-wider mb-1">{scenario.name}</h1>
            <div className="font-mono text-sm text-[#8A8F98]">{scenario.briefing.date}</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#12141A] border border-[#1E2028] p-6 mb-6 scanlines">
            <div className="font-mono text-[10px] text-[#00FF88] tracking-widest mb-3">INTELLIGENCE BRIEF</div>
            <p className="font-body text-[#E8E8E8] leading-relaxed">{scenario.briefing.context}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-[#12141A] border border-[#1E2028] p-6">
              <div className="font-mono text-[10px] text-[#00FF88] tracking-widest mb-4">FEAR / GREED INDEX</div>
              <FearGreedGauge value={scenario.briefing.fearGreed} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-[#12141A] border border-[#1E2028] p-6">
              <div className="font-mono text-[10px] text-[#00FF88] tracking-widest mb-4">SECTOR HEAT MAP</div>
              <SectorHeatMap sectors={scenario.briefing.sectors} />
            </motion.div>
          </div>

          {/* News Ticker */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-[#12141A] border border-[#1E2028] p-6 mb-8">
            <div className="font-mono text-[10px] text-[#FF2D55] tracking-widest mb-3">LIVE NEWS FEED</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={headlineIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="font-mono text-sm text-white"
              >
                {scenario.briefing.headlines[headlineIndex]}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => setPhase('allocate')}
            className="w-full bg-[#00FF88] text-[#07080D] py-4 font-mono text-sm tracking-widest uppercase font-bold hover:bg-[#00cc6e] transition-colors"
          >
            PROCEED TO ALLOCATION {'>>'}
          </motion.button>
        </div>
      </div>
    );
  }

  // ALLOCATION PHASE
  if (phase === 'allocate') {
    return (
      <div className="min-h-screen bg-[#07080D] pt-12 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-[10px] text-[#F5A623] tracking-widest mb-1">PORTFOLIO ALLOCATION</div>
              <h2 className="font-display text-2xl text-white tracking-wider">Deploy Your Capital</h2>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] text-[#8A8F98] tracking-widest">AVAILABLE</div>
              <div className="font-mono text-2xl text-[#00FF88]">{'\u20B9'}{(1000000 - (totalAllocated as number)).toLocaleString('en-IN')}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {scenario.companies.map((company, i) => {
              const allocated = allocations[company.name] || 0;
              const sparkData = company.sparkline.map((v, idx) => ({ x: idx, y: v }));
              return (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-[#12141A] border p-5 scanlines ${allocated > 0 ? 'border-[#00FF88] glow-border' : 'border-[#1E2028]'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display text-sm text-white font-bold">{company.name}</h3>
                    <span className="pill-badge bg-[#1E2028] text-[#8A8F98]">{company.sector}</span>
                  </div>
                  <div className="font-mono text-xl text-[#00FF88] mb-2">{'\u20B9'}{company.price.toLocaleString('en-IN')}</div>
                  <div className="h-12 mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sparkData}>
                        <Line type="monotone" dataKey="y" stroke="#00FF88" strokeWidth={1.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="font-mono text-[9px] text-[#8A8F98] mb-3">{company.sentiment}</div>
                  <div className="flex gap-2">
                    {[100000, 200000, 500000].map(amt => (
                      <button
                        key={amt}
                        onClick={() => handleAllocate(company.name, allocated === amt ? 0 : amt)}
                        className={`flex-1 py-1.5 font-mono text-[10px] border ${allocated === amt ? 'bg-[#00FF88] text-[#07080D] border-[#00FF88]' : 'border-[#1E2028] text-[#8A8F98] hover:border-[#00FF88] hover:text-[#00FF88]'}`}
                      >
                        {(amt / 100000).toFixed(0)}L
                      </button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {(totalAllocated as number) > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleExecutePositions}
              className="w-full bg-[#00FF88] text-[#07080D] py-4 font-mono text-sm tracking-widest uppercase font-bold hover:bg-[#00cc6e] transition-colors"
            >
              EXECUTE POSITIONS {'>>'}
            </motion.button>
          )}
        </div>
      </div>
    );
  }

  // EVENTS PHASE
  if (phase === 'events') {
    const event = scenario.events[currentEventIndex];
    return (
      <div className="min-h-screen bg-[#07080D] pt-12 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Portfolio Value */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-[10px] text-[#8A8F98] tracking-widest">EVENT {currentEventIndex + 1} OF {scenario.events.length}</div>
              <div className="w-full bg-[#1E2028] h-1 mt-2">
                <div className="bg-[#00FF88] h-1 transition-all" style={{ width: `${((currentEventIndex + 1) / scenario.events.length) * 100}%` }} />
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] text-[#8A8F98] tracking-widest">PORTFOLIO VALUE</div>
              <div className={`font-mono text-2xl font-bold ${portfolioValue >= 1000000 ? 'text-[#00FF88]' : 'text-[#FF2D55]'}`}>
                {'\u20B9'}{portfolioValue.toLocaleString('en-IN')}
              </div>
              <div className={`font-mono text-xs ${portfolioValue >= 1000000 ? 'text-[#00FF88]' : 'text-[#FF2D55]'}`}>
                {portfolioValue >= 1000000 ? '+' : ''}{(((portfolioValue - 1000000) / 1000000) * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Event Card */}
          <motion.div
            key={currentEventIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#12141A] border-2 border-[#FF2D55] p-6 mb-6 red-flash scanlines"
          >
            <div className="font-mono text-[10px] text-[#FF2D55] tracking-widest mb-2">BREAKING</div>
            <h3 className="font-display text-xl text-white font-bold mb-3">{event.title}</h3>
            <p className="font-body text-[#E8E8E8] leading-relaxed">{event.brief}</p>
          </motion.div>

          {/* Choices */}
          <AnimatePresence mode="wait">
            {showEventChoice ? (
              <motion.div
                key="choices"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3"
              >
                {event.choices.map((choice, i) => (
                  <motion.button
                    key={choice.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    onClick={() => handleEventChoice(choice)}
                    className="w-full text-left bg-[#12141A] border border-[#1E2028] p-5 hover:border-[#00FF88] transition-all group"
                  >
                    <div className="font-mono text-sm text-white group-hover:text-[#00FF88] transition-colors">{choice.text}</div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#12141A] border border-[#1E2028] p-6 text-center"
              >
                <div className={`font-mono text-3xl font-bold ${decisions[decisions.length - 1]?.portfolioImpact >= 0 ? 'text-[#00FF88]' : 'text-[#FF2D55]'}`}>
                  {decisions[decisions.length - 1]?.portfolioImpact >= 0 ? '+' : ''}{(decisions[decisions.length - 1]?.portfolioImpact * 100).toFixed(1)}%
                </div>
                <div className="font-body text-sm text-[#8A8F98] mt-2 italic">{decisions[decisions.length - 1]?.annotation}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // DEBRIEF PHASE
  return (
    <MarketDebrief
      scenario={scenario}
      portfolioValue={portfolioValue}
      decisions={decisions}
      portfolioHistory={portfolioHistory}
      onBack={() => navigate('/market')}
    />
  );
}
