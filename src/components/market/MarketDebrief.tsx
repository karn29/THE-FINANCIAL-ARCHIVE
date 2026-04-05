import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceDot } from 'recharts';
import type { MarketScenario, MarketChoice } from '../../data/market';
import { getIdentity } from '../../utils/storage';

interface MarketDebriefProps {
  scenario: MarketScenario;
  portfolioValue: number;
  decisions: MarketChoice[];
  portfolioHistory: { event: string; value: number }[];
  onBack: () => void;
}

export function MarketDebrief({ scenario, portfolioValue, decisions, portfolioHistory, onBack }: MarketDebriefProps) {
  const identity = getIdentity();
  const returnPct = ((portfolioValue - 1000000) / 1000000) * 100;
  const isPositive = returnPct >= 0;

  // Determine diagnosed bias
  const avgRisk = decisions.reduce((s, d) => s + d.riskAppetite, 0) / decisions.length;
  const avgContrarian = decisions.reduce((s, d) => s + d.contrarianScore, 0) / decisions.length;
  let diagnosedBias = 'Confirmation Bias';
  let biasDescription = scenario.biases['Confirmation Bias'] || '';

  if (avgRisk > 10) {
    diagnosedBias = 'Overconfidence';
    biasDescription = scenario.biases['Overconfidence'] || biasDescription;
  } else if (avgRisk < -10) {
    diagnosedBias = 'Loss Aversion';
    biasDescription = scenario.biases['Loss Aversion'] || biasDescription;
  } else if (avgContrarian < -5) {
    diagnosedBias = Object.keys(scenario.biases).find(k => k.includes('Herd') || k.includes('Status')) || 'Herding';
    biasDescription = scenario.biases[diagnosedBias] || biasDescription;
  }

  // Decision replay - compare to optimal
  const decisionReplay = decisions.map((d, i) => {
    const optimalIdx = scenario.optimalPath[i];
    const userIdx = scenario.events[i].choices.indexOf(d);
    const aligned = userIdx === optimalIdx;
    return { event: scenario.events[i].title, choice: d.text, aligned, annotation: d.annotation };
  });

  // Smart loss check
  const isSmartLoss = returnPct < 0 && avgContrarian > 5 && decisions.filter((_, i) => {
    const optimalIdx = scenario.optimalPath[i];
    const userIdx = scenario.events[i].choices.indexOf(decisions[i]);
    return userIdx === optimalIdx;
  }).length >= decisions.length * 0.5;

  // Find the worst inflection point
  let worstIdx = 0;
  let worstDivergence = 0;
  decisionReplay.forEach((d, i) => {
    if (!d.aligned) {
      const impact = Math.abs(decisions[i].portfolioImpact);
      if (impact > worstDivergence) {
        worstDivergence = impact;
        worstIdx = i;
      }
    }
  });

  const chartData = portfolioHistory.map((h, i) => ({ name: `E${i}`, value: h.value }));

  return (
    <div className="min-h-screen bg-[#07080D] pt-12 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button onClick={onBack} className="font-mono text-xs text-[#8A8F98] hover:text-[#00FF88] tracking-widest mb-8 block">{'<'} BACK TO DOSSIERS</button>

          <div className="font-mono text-[10px] text-[#F5A623] tracking-widest mb-2">THE DEBRIEF // {scenario.name} ({scenario.year})</div>

          {/* Final Portfolio Value */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#12141A] border border-[#1E2028] p-8 text-center mb-8 scanlines"
          >
            <div className="font-mono text-[10px] text-[#8A8F98] tracking-widest mb-2">FINAL PORTFOLIO VALUE</div>
            <div className={`font-mono text-5xl font-bold ${isPositive ? 'text-[#00FF88]' : 'text-[#FF2D55]'}`}>
              {'\u20B9'}{portfolioValue.toLocaleString('en-IN')}
            </div>
            <div className={`font-mono text-xl mt-2 ${isPositive ? 'text-[#00FF88]' : 'text-[#FF2D55]'}`}>
              {isPositive ? '+' : ''}{returnPct.toFixed(1)}%
            </div>
            {isSmartLoss && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-4 inline-block border border-[#F5A623] px-4 py-2"
              >
                <span className="font-mono text-sm text-[#F5A623]">SMART LOSS \u2014 You lost the bet but won the thinking. The market was irrational. You were not.</span>
              </motion.div>
            )}
          </motion.div>

          {/* Portfolio Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-[#12141A] border border-[#1E2028] p-6 mb-6 scanlines">
            <div className="font-mono text-[10px] text-[#00FF88] tracking-widest mb-4">PORTFOLIO TRAJECTORY</div>
            <div className="h-48">
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <XAxis dataKey="name" tick={{ fill: '#8A8F98', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#8A8F98', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ background: '#12141A', border: '1px solid #1E2028', fontFamily: 'IBM Plex Mono', fontSize: 11 }}
                    labelStyle={{ color: '#8A8F98' }}
                  />
                  <Line type="monotone" dataKey="value" stroke={isPositive ? '#00FF88' : '#FF2D55'} strokeWidth={2} dot={{ fill: '#07080D', stroke: isPositive ? '#00FF88' : '#FF2D55', r: 4 }} />
                  <ReferenceDot x="E0" y={1000000} r={0} label={{ value: 'START', fill: '#8A8F98', fontSize: 10 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Legendary Investor Comparison */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-[#12141A] border border-[#1E2028] p-6 mb-6">
            <div className="font-mono text-[10px] text-[#F5A623] tracking-widest mb-3">WHAT THE LEGEND DID</div>
            <div className="font-display text-lg text-white font-bold mb-2">{scenario.legendaryInvestor}</div>
            <p className="font-body text-[#E8E8E8] text-sm leading-relaxed">{scenario.legendaryAction}</p>
          </motion.div>

          {/* Cognitive Bias Diagnosis */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-[#12141A] border border-[#FF2D55] p-6 mb-6">
            <div className="font-mono text-[10px] text-[#FF2D55] tracking-widest mb-3">COGNITIVE BIAS DIAGNOSED</div>
            <div className="font-display text-xl text-white font-bold mb-2">{diagnosedBias}</div>
            <p className="font-body text-[#E8E8E8] text-sm leading-relaxed italic">{biasDescription}</p>
          </motion.div>

          {/* Decision Replay Timeline */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-[#12141A] border border-[#1E2028] p-6 mb-6 scanlines">
            <div className="font-mono text-[10px] text-[#00FF88] tracking-widest mb-4">DECISION REPLAY TIMELINE</div>
            <div className="flex items-center gap-1 mb-6">
              <div className="w-2 h-2 bg-[#00FF88]" />
              <span className="font-mono text-[9px] text-[#8A8F98] mr-4">Aligned with optimal</span>
              <div className="w-2 h-2 bg-[#FF2D55]" />
              <span className="font-mono text-[9px] text-[#8A8F98]">Diverged from optimal</span>
            </div>
            <div className="relative">
              <div className="absolute top-3 left-0 right-0 h-0.5 bg-[#1E2028]" />
              <div className="flex justify-between relative">
                {decisionReplay.map((d, i) => (
                  <div key={i} className="flex flex-col items-center relative group" style={{ width: `${100 / decisionReplay.length}%` }}>
                    <div className={`w-6 h-6 flex items-center justify-center text-xs font-mono font-bold ${d.aligned ? 'bg-[#00FF88] text-[#07080D]' : 'bg-[#FF2D55] text-white'}`}>
                      {i + 1}
                    </div>
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-[#07080D] border border-[#1E2028] p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      <div className="font-mono text-[8px] text-[#8A8F98]">{d.annotation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* The Moment It Went Wrong */}
          {decisionReplay.some(d => !d.aligned) && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-[#12141A] border border-[#F5A623] p-6 mb-6">
              <div className="font-mono text-[10px] text-[#F5A623] tracking-widest mb-3">THE MOMENT THIS WENT WRONG</div>
              <div className="font-display text-lg text-white font-bold mb-2">Event {worstIdx + 1}: {scenario.events[worstIdx].title}</div>
              <p className="font-body text-[#E8E8E8] text-sm leading-relaxed mb-3">{scenario.events[worstIdx].brief}</p>
              <div className="border-t border-[#1E2028] pt-3">
                <div className="font-mono text-[9px] text-[#FF2D55] tracking-widest mb-1">YOUR CHOICE</div>
                <div className="font-body text-sm text-[#8A8F98]">{decisions[worstIdx].text}</div>
                <div className="font-mono text-[9px] text-[#00FF88] tracking-widest mt-3 mb-1">OPTIMAL CHOICE</div>
                <div className="font-body text-sm text-[#8A8F98]">{scenario.events[worstIdx].choices[scenario.optimalPath[worstIdx]].text}</div>
              </div>
            </motion.div>
          )}

          {/* Shareable Result Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="bg-[#12141A] border border-[#1E2028] p-6 text-center">
            <div className="border border-[#1E2028] p-6 inline-block">
              <div className="font-mono text-[9px] text-[#8A8F98] tracking-widest mb-2">CLASSIFIED RESULT // FINCRAFT</div>
              <div className="font-display text-lg text-white font-bold">{scenario.name} ({scenario.year})</div>
              <div className={`font-mono text-3xl font-bold mt-2 ${isPositive ? 'text-[#00FF88]' : 'text-[#FF2D55]'}`}>
                {isPositive ? '+' : ''}{returnPct.toFixed(1)}%
              </div>
              <div className="font-mono text-sm text-[#F5A623] mt-2">{identity.archetypeLabel}</div>
              <div className="font-body text-xs text-[#8A8F98] mt-2 italic">Bias: {diagnosedBias}</div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => {
                  const text = `I just ran the ${scenario.name} (${scenario.year}) simulation on FinCraft. Return: ${isPositive ? '+' : ''}${returnPct.toFixed(1)}%. Archetype: ${identity.archetypeLabel}. Bias diagnosed: ${diagnosedBias}. Think you can beat that?`;
                  navigator.clipboard.writeText(text);
                }}
                className="font-mono text-xs text-[#00FF88] border border-[#00FF88] px-4 py-2 hover:bg-[#00FF88] hover:text-[#07080D] transition-colors"
              >
                COPY SHARE TEXT
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
