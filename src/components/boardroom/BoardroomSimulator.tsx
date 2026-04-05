import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import { boardroomScenarios } from '../../data/boardroom';
import type { BoardroomScenario, BoardroomDecision } from '../../data/boardroom';
import { addDecision, addSimulationResult, addBadge, getIdentity, getVotes, addVote } from '../../utils/storage';
import { triggerAchievement } from '../shared/AchievementToast';

export function BoardroomSelector() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#07080D] pt-12 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate('/')} className="font-mono text-xs text-[#8A8F98] hover:text-[#00FF88] mb-8 block tracking-widest">
          {'<'} BACK TO HQ
        </button>
        <h1 className="font-display text-4xl text-white tracking-widest uppercase mb-2">Boardroom Simulator</h1>
        <p className="font-body text-[#8A8F98] mb-12">Executive Briefing Files. Board Eyes Only.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {boardroomScenarios.map((scenario, i) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#12141A] border border-[#1E2028] p-6 cursor-pointer hover:border-[#00FF88] transition-all group scanlines relative overflow-hidden"
            >
              <div className="absolute top-3 right-3 font-mono text-[40px] font-extrabold text-white/[0.03] select-none">{scenario.year}</div>
              <div className="absolute top-4 right-4 border border-[#FF2D55] px-2 py-0.5">
                <span className="font-mono text-[8px] text-[#FF2D55] tracking-widest">CLASSIFIED \u2014 BOARD EYES ONLY</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[#F5A623] text-sm font-bold">{scenario.year}</span>
                <span className="font-display text-xl text-white font-bold group-hover:text-[#00FF88] transition-colors">{scenario.company}</span>
              </div>
              <p className="font-body text-[#8A8F98] text-sm mb-6">{scenario.stakes}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/boardroom/${scenario.id}?mode=solo`)}
                  className="flex-1 py-2.5 font-mono text-xs tracking-widest border border-[#00FF88] text-[#00FF88] hover:bg-[#00FF88] hover:text-[#07080D] transition-colors"
                >
                  SOLO MODE
                </button>
                <button
                  onClick={() => navigate(`/boardroom/${scenario.id}?mode=challenge`)}
                  className="flex-1 py-2.5 font-mono text-xs tracking-widest border border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623] hover:text-[#07080D] transition-colors"
                >
                  CHALLENGE MODE
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BoardroomGame() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const scenario = boardroomScenarios.find(s => s.id === id);
  const searchParams = new URLSearchParams(window.location.search);
  const mode = searchParams.get('mode') || 'solo';

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDecision, setSelectedDecision] = useState<BoardroomDecision | null>(null);
  const [showDeclassified, setShowDeclassified] = useState(false);
  const [background, setBackground] = useState<string>('');
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(mode === 'challenge');
  const [votes, setVotes] = useState<Record<string, { total: number; finance: number; mba: number }>>({});
  const [fakeVoteCounts, setFakeVoteCounts] = useState<Record<string, number>>({});

  const totalSlides = 7;

  // Generate fake vote counts for challenge mode
  useEffect(() => {
    if (scenario && mode === 'challenge') {
      const stored = getVotes(scenario.id);
      setVotes(stored);

      // Generate fake baseline votes using scenario id as seed
      const seed = scenario.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
      const counts: Record<string, number> = {};
      scenario.decisions.forEach((d, i) => {
        counts[d.id] = Math.floor(((seed * (i + 1) * 7) % 200) + 50);
      });
      setFakeVoteCounts(counts);

      // Simulate live votes with setInterval
      const interval = setInterval(() => {
        setFakeVoteCounts(prev => {
          const next = { ...prev };
          const keys = Object.keys(next);
          const key = keys[Math.floor(Math.random() * keys.length)];
          if (key) next[key] = (next[key] || 0) + 1;
          return next;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [scenario, mode]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
      if (currentSlide === 4 && !selectedDecision) return;
      setCurrentSlide(prev => prev + 1);
    }
    if (e.key === 'ArrowLeft' && currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide, selectedDecision]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleDecision = (decision: BoardroomDecision) => {
    if (!scenario) return;
    setSelectedDecision(decision);

    // Record decision
    addDecision({
      id: decision.id,
      scenarioId: scenario.id,
      scenarioName: `${scenario.company} ${scenario.year}`,
      scenarioType: 'boardroom',
      choice: decision.title,
      annotation: decision.consequence,
      timestamp: Date.now(),
      impact: {
        riskAppetite: decision.riskAppetite,
        innovationBias: decision.innovation,
        lossTolerance: decision.financialDiscipline,
        contrarianScore: decision.strategicClarity,
        decisionSpeed: decision.peopleBet,
        indiaInstinct: (scenario.id === 'infosys-1999' || scenario.id === 'zomato-2021') ? 15 : 0,
      },
    });

    // Record votes for challenge mode
    if (mode === 'challenge' && background) {
      const newVotes = addVote(scenario.id, decision.id, background);
      setVotes(newVotes);
    }

    // Add simulation result
    const identity = getIdentity();
    addSimulationResult({
      scenarioId: scenario.id,
      scenarioName: `${scenario.company} ${scenario.year}`,
      scenarioType: 'boardroom',
      finalReturn: decision.id === scenario.historicalOutcome.correctChoice ? 100 : -20,
      benchmark: 0,
      biasDiagnosed: decision.riskAppetite > 15 ? 'Overconfidence' : decision.riskAppetite < -10 ? 'Loss Aversion' : 'Status Quo Bias',
      biasDescription: 'Your boardroom decision pattern reveals your strategic instincts.',
      archetypeLabel: identity.archetypeLabel,
      completedAt: Date.now(),
      decisions: [],
    });

    // Check for badges
    const allResults = identity.simulationResults.filter(r => r.scenarioType === 'boardroom');
    if (allResults.length >= 3) {
      const badge = { id: 'boardroom-legend', name: 'BOARDROOM LEGEND', description: 'Completed all four boardrooms.', icon: '\uD83D\uDC51', earnedAt: Date.now() };
      addBadge(badge);
      triggerAchievement(badge);
    }

    if (scenario.id === 'infosys-1999' || scenario.id === 'zomato-2021') {
      const badge = { id: 'india-boardroom', name: 'INDIA STRATEGIST', description: 'Completed an Indian boardroom scenario.', icon: '\uD83C\uDDEE\uD83C\uDDF3', earnedAt: Date.now() };
      addBadge(badge);
      triggerAchievement(badge);
    }

    // Auto-advance to next slide
    setTimeout(() => setCurrentSlide(5), 1500);
  };

  if (!scenario) {
    return (
      <div className="min-h-screen bg-[#07080D] flex items-center justify-center">
        <div className="text-center">
          <div className="font-display text-2xl text-white mb-4">Scenario Not Found</div>
          <button onClick={() => navigate('/boardroom')} className="font-mono text-sm text-[#00FF88]">{'<'} Back to Boardroom</button>
        </div>
      </div>
    );
  }

  // Background picker for challenge mode
  if (showBackgroundPicker) {
    return (
      <div className="min-h-screen bg-[#07080D] flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#12141A] border border-[#1E2028] p-8 max-w-md w-full text-center">
          <div className="font-mono text-[10px] text-[#F5A623] tracking-widest mb-4">CHALLENGE MODE</div>
          <h2 className="font-display text-xl text-white mb-6">Identify Your Background</h2>
          <div className="space-y-3">
            {[
              { id: 'finance', label: 'Finance Student / Professional' },
              { id: 'mba', label: 'MBA Student / Graduate' },
              { id: 'engineering', label: 'Engineering / Tech' },
              { id: 'other', label: 'Other Background' },
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => { setBackground(opt.id); setShowBackgroundPicker(false); }}
                className="w-full py-3 font-mono text-sm text-white border border-[#1E2028] hover:border-[#00FF88] hover:text-[#00FF88] transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  const chartData = scenario.chartData.values.map((v, i) => ({
    name: scenario.chartData.labels[i],
    value: v,
    isCrisis: i === scenario.chartData.crisisPoint,
  }));

  // CEO Rating radar data
  const ceoRatingData = selectedDecision ? [
    { axis: 'Risk Appetite', value: Math.max(0, 50 + selectedDecision.riskAppetite) },
    { axis: 'Innovation', value: Math.max(0, 50 + selectedDecision.innovation) },
    { axis: 'Financial Discipline', value: Math.max(0, 50 + selectedDecision.financialDiscipline) },
    { axis: 'People Bet', value: Math.max(0, 50 + selectedDecision.peopleBet) },
    { axis: 'Strategic Clarity', value: Math.max(0, 50 + selectedDecision.strategicClarity) },
  ] : [];

  // Calculate vote percentages for challenge mode
  const getVotePercentage = (decisionId: string) => {
    const realVotes = votes[decisionId]?.total || 0;
    const fakeBase = fakeVoteCounts[decisionId] || 100;
    const total = realVotes + fakeBase;
    const allTotal = scenario.decisions.reduce((s, d) => {
      return s + (votes[d.id]?.total || 0) + (fakeVoteCounts[d.id] || 100);
    }, 0);
    return allTotal > 0 ? Math.round((total / allTotal) * 100) : 33;
  };

  const slides = [
    // Slide 0: SITUATION ROOM
    <motion.div key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <div className="font-mono text-[10px] text-[#F5A623] tracking-widest mb-4">SLIDE 1 // SITUATION ROOM</div>
      <h2 className="font-display text-3xl text-white tracking-wider mb-6">{scenario.company} \u2014 {scenario.year}</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'REVENUE', value: scenario.situation.revenue },
          { label: 'GROWTH', value: scenario.situation.growth },
          { label: 'KEY METRIC', value: scenario.situation.metric },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.15 }} className="bg-[#12141A] border border-[#1E2028] p-4 text-center satellite-load">
            <div className="font-mono text-[9px] text-[#8A8F98] tracking-widest mb-1">{stat.label}</div>
            <div className="font-mono text-lg text-[#00FF88] font-bold">{stat.value}</div>
          </motion.div>
        ))}
      </div>
      <div className="bg-[#12141A] border border-[#1E2028] p-6 scanlines">
        <p className="font-body text-[#E8E8E8] leading-relaxed">{scenario.situation.brief}</p>
      </div>
    </motion.div>,

    // Slide 1: THE CRISIS
    <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <div className="font-mono text-[10px] text-[#FF2D55] tracking-widest mb-4">SLIDE 2 // THE CRISIS</div>
      <div className="bg-[#12141A] border-2 border-[#FF2D55] p-8 scanlines">
        <p className="font-body text-[#E8E8E8] leading-relaxed text-lg mb-6">{scenario.crisis.description}</p>
        <div className="border-t border-[#1E2028] pt-4">
          <div className="font-mono text-[10px] text-[#F5A623] tracking-widest mb-2">WHAT IS AT STAKE</div>
          <p className="font-body text-[#F5A623] leading-relaxed italic">{scenario.crisis.stakes}</p>
        </div>
      </div>
    </motion.div>,

    // Slide 2: THE NUMBERS
    <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <div className="font-mono text-[10px] text-[#00FF88] tracking-widest mb-4">SLIDE 3 // THE NUMBERS</div>
      <div className="bg-[#12141A] border border-[#1E2028] p-6 scanlines">
        <div className="font-mono text-sm text-[#8A8F98] mb-4">{scenario.chartData.label}</div>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: '#8A8F98', fontSize: 10, fontFamily: 'IBM Plex Mono' }} />
              <YAxis tick={{ fill: '#8A8F98', fontSize: 10, fontFamily: 'IBM Plex Mono' }} />
              <Tooltip contentStyle={{ background: '#12141A', border: '1px solid #1E2028', fontFamily: 'IBM Plex Mono', fontSize: 11 }} />
              <Bar dataKey="value">
                {chartData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.isCrisis ? '#FF2D55' : '#00FF88'} fillOpacity={entry.isCrisis ? 1 : 0.7} />
                ))}
              </Bar>
              <ReferenceLine x={scenario.chartData.labels[scenario.chartData.crisisPoint]} stroke="#FF2D55" strokeDasharray="3 3" label={{ value: scenario.chartData.annotation, fill: '#FF2D55', fontSize: 10, fontFamily: 'IBM Plex Mono', position: 'top' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>,

    // Slide 3: THE BOARD SPEAKS
    <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <div className="font-mono text-[10px] text-[#F5A623] tracking-widest mb-4">SLIDE 4 // THE BOARD SPEAKS</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scenario.boardMembers.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.2 }}
            className={`bg-[#12141A] border p-6 ${member.stance === 'pro' ? 'border-[#00FF88]' : 'border-[#FF2D55]'}`}
          >
            {/* Avatar placeholder */}
            <div className={`w-16 h-16 mb-4 flex items-center justify-center text-2xl font-display font-bold ${member.stance === 'pro' ? 'bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30' : 'bg-[#FF2D55]/10 text-[#FF2D55] border border-[#FF2D55]/30'}`}>
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="font-display text-base text-white font-bold">{member.name}</div>
            <div className="font-mono text-[9px] text-[#8A8F98] tracking-widest mb-3">{member.title}</div>
            <div className={`pill-badge mb-3 ${member.stance === 'pro' ? 'bg-[#00FF88]/20 text-[#00FF88]' : 'bg-[#FF2D55]/20 text-[#FF2D55]'}`}>
              {member.stance === 'pro' ? 'PRO-ACTION' : 'CAUTIONARY'}
            </div>
            <p className="font-body text-[#E8E8E8] text-sm leading-relaxed italic">"{member.argument}"</p>
          </motion.div>
        ))}
      </div>
    </motion.div>,

    // Slide 4: YOUR CALL
    <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <div className="font-mono text-[10px] text-[#00FF88] tracking-widest mb-4">SLIDE 5 // YOUR CALL</div>
      <h2 className="font-display text-2xl text-white tracking-wider mb-6">What is your decision?</h2>
      <div className="space-y-4">
        {scenario.decisions.map((decision, i) => (
          <motion.button
            key={decision.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            disabled={!!selectedDecision}
            onClick={() => handleDecision(decision)}
            className={`w-full text-left p-6 border transition-all ${
              selectedDecision?.id === decision.id
                ? 'bg-[#00FF88]/10 border-[#00FF88] glow-border'
                : selectedDecision
                ? 'bg-[#12141A] border-[#1E2028] opacity-40'
                : 'bg-[#12141A] border-[#1E2028] hover:border-[#00FF88] cursor-pointer'
            }`}
          >
            <div className="font-display text-base text-white font-bold mb-2">{decision.title}</div>
            <p className="font-body text-sm text-[#8A8F98] leading-relaxed">{decision.consequence}</p>
            {mode === 'challenge' && selectedDecision && (
              <div className="mt-3 font-mono text-xs text-[#F5A623]">
                {getVotePercentage(decision.id)}% of players chose this
              </div>
            )}
          </motion.button>
        ))}
      </div>
      {selectedDecision && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-center">
          <div className="font-mono text-sm text-[#00FF88] mb-4">Decision locked. Processing...</div>
        </motion.div>
      )}
    </motion.div>,

    // Slide 5: WHAT HAPPENED (DECLASSIFIED)
    <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto relative">
      <div className="font-mono text-[10px] text-[#F5A623] tracking-widest mb-4">SLIDE 6 // WHAT HAPPENED</div>
      {/* DECLASSIFIED stamp */}
      <motion.div
        initial={{ scale: 3, opacity: 0, rotate: -15 }}
        animate={{ scale: 1, opacity: 1, rotate: -12 }}
        transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
        className="absolute top-8 right-8 border-4 border-[#FF2D55] px-6 py-2 z-10 pointer-events-none"
      >
        <span className="font-display text-3xl text-[#FF2D55] font-extrabold tracking-widest">DECLASSIFIED</span>
      </motion.div>

      <div className="bg-[#12141A] border border-[#1E2028] p-6 mb-6 scanlines">
        <div className="font-mono text-[10px] text-[#00FF88] tracking-widest mb-3">THE REAL OUTCOME</div>
        <p className="font-body text-[#E8E8E8] leading-relaxed">{scenario.historicalOutcome.whatHappened}</p>
      </div>

      {/* What-If Panel */}
      <div className="font-mono text-[10px] text-[#F5A623] tracking-widest mb-3">ALTERNATE TIMELINES</div>
      <div className="space-y-3">
        {scenario.decisions.filter(d => d.id !== selectedDecision?.id).map(d => (
          <div key={d.id} className="bg-[#12141A] border border-[#1E2028] p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,45,85,0.03)_2px,rgba(255,45,85,0.03)_4px)] pointer-events-none" />
            <div className="font-display text-sm text-white font-bold mb-1 relative">{d.title}</div>
            <p className="font-body text-sm text-[#8A8F98] italic relative">{scenario.historicalOutcome.alternateHistories[d.id]}</p>
            <div className="absolute top-2 right-2 font-mono text-[8px] text-[#FF2D55]/50 tracking-widest">[REDACTED TIMELINE]</div>
          </div>
        ))}
      </div>

      {/* Challenge mode results */}
      {mode === 'challenge' && selectedDecision && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-6 bg-[#12141A] border border-[#F5A623] p-6">
          <div className="font-mono text-[10px] text-[#F5A623] tracking-widest mb-3">CHALLENGE RESULTS</div>
          {(() => {
            const pct = getVotePercentage(selectedDecision.id);
            const isMajority = pct > 50;
            return (
              <div className="text-center">
                <div className="font-mono text-lg text-white">
                  {isMajority
                    ? `${pct}% of players chose this. You were in the majority.`
                    : `Only ${pct}% chose this. You went against the room.`}
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </motion.div>,

    // Slide 6: CEO RATING
    <motion.div key="s6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <div className="font-mono text-[10px] text-[#00FF88] tracking-widest mb-4">SLIDE 7 // CEO RATING</div>
      <h2 className="font-display text-2xl text-white tracking-wider mb-6">Your Strategic Profile</h2>

      {selectedDecision && (
        <>
          <div className="bg-[#12141A] border border-[#1E2028] p-6 mb-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <RadarChart data={ceoRatingData}>
                  <PolarGrid stroke="#1E2028" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: '#8A8F98', fontSize: 10, fontFamily: 'IBM Plex Mono' }} />
                  <Radar dataKey="value" stroke="#00FF88" fill="#00FF88" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#12141A] border border-[#1E2028] p-6 text-center mb-6">
            <div className="font-mono text-[10px] text-[#8A8F98] tracking-widest mb-2">YOUR ARCHETYPE</div>
            <div className="font-display text-2xl text-[#00FF88] font-bold">{getIdentity().archetypeLabel}</div>
            <div className="font-body text-sm text-[#8A8F98] mt-2">
              {selectedDecision.id === scenario.historicalOutcome.correctChoice
                ? 'You chose the path that history proved correct.'
                : 'Your choice diverged from what history rewarded. But was history right?'}
            </div>
          </div>

          {/* Share Verdict */}
          <div className="text-center">
            <button
              onClick={() => {
                const text = `I just ran the ${scenario.company} ${scenario.year} boardroom on FinCraft. I chose "${selectedDecision.title}". ${getVotePercentage(selectedDecision.id)}% agreed. Here is why it was right.`;
                navigator.clipboard.writeText(text);
              }}
              className="font-mono text-xs text-[#00FF88] border border-[#00FF88] px-6 py-3 hover:bg-[#00FF88] hover:text-[#07080D] transition-colors"
            >
              SHARE YOUR VERDICT
            </button>
          </div>
        </>
      )}

      <div className="mt-8 text-center">
        <button onClick={() => navigate('/boardroom')} className="font-mono text-xs text-[#8A8F98] hover:text-[#00FF88] tracking-widest">
          {'<'} BACK TO BRIEFING FILES
        </button>
      </div>
    </motion.div>,
  ];

  return (
    <div className="min-h-screen bg-[#07080D] pt-12 pb-20 px-4">
      {/* Progress Bar */}
      <div className="fixed top-8 left-0 right-0 z-30 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div key={i} className={`h-1 flex-1 ${i <= currentSlide ? 'bg-[#00FF88]' : 'bg-[#1E2028]'} transition-colors`} />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-20 left-0 right-0 z-30 px-4 no-print">
        <div className="max-w-4xl mx-auto flex justify-between">
          <button
            onClick={() => currentSlide > 0 && setCurrentSlide(prev => prev - 1)}
            disabled={currentSlide === 0}
            className={`font-mono text-sm px-4 py-2 border ${currentSlide > 0 ? 'border-[#1E2028] text-[#8A8F98] hover:border-[#00FF88] hover:text-[#00FF88]' : 'border-transparent text-transparent cursor-default'}`}
          >
            {'<'} PREV
          </button>
          <button
            onClick={() => {
              if (currentSlide === 4 && !selectedDecision) return;
              if (currentSlide < totalSlides - 1) setCurrentSlide(prev => prev + 1);
            }}
            disabled={currentSlide >= totalSlides - 1 || (currentSlide === 4 && !selectedDecision)}
            className={`font-mono text-sm px-4 py-2 border ${
              currentSlide < totalSlides - 1 && !(currentSlide === 4 && !selectedDecision)
                ? 'border-[#00FF88] text-[#00FF88] hover:bg-[#00FF88] hover:text-[#07080D]'
                : 'border-[#1E2028] text-[#8A8F98] cursor-default'
            }`}
          >
            NEXT {'>'}
          </button>
        </div>
      </div>

      {/* Slide Content */}
      <div className="pt-8">
        <AnimatePresence mode="wait">
          {slides[currentSlide]}
        </AnimatePresence>
      </div>
    </div>
  );
}
