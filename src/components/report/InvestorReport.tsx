import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { getIdentity } from '../../utils/storage';

function generateSummary(identity: ReturnType<typeof getIdentity>): string {
  const parts: string[] = [];

  if (identity.riskAppetite > 65) {
    parts.push('This operator shows a high risk appetite, consistently betting on aggressive positions.');
  } else if (identity.riskAppetite < 35) {
    parts.push('This operator demonstrates conservative risk management, preferring defensive positions.');
  } else {
    parts.push('This operator shows balanced risk tolerance, neither overly aggressive nor overly conservative.');
  }

  if (identity.contrarianScore > 60) {
    parts.push('Strong contrarian instincts are evident — willing to go against consensus when data supports it.');
  } else if (identity.contrarianScore < 40) {
    parts.push('Tends to align with market consensus, suggesting a preference for validated positions.');
  }

  if (identity.lossTolerance > 60) {
    parts.push('Above-average loss tolerance indicates psychological resilience during drawdowns.');
  } else if (identity.lossTolerance < 40) {
    parts.push('Below-average loss tolerance suggests a tendency to exit positions prematurely during volatility.');
  }

  if (identity.innovationBias > 60) {
    parts.push('Innovation-forward thinking drives investment decisions toward emerging opportunities.');
  }

  if (identity.indiaInstinct > 30) {
    parts.push('Notable familiarity with Indian market dynamics and regulatory environments.');
  }

  const crisisResults = identity.simulationResults.filter(r => r.finalReturn > 10);
  if (crisisResults.length > 0) {
    parts.push('Performance peaks in crisis scenarios, suggesting an opportunistic rather than systemic investment style.');
  }

  return parts.join(' ');
}

export function InvestorReport() {
  const navigate = useNavigate();
  const identity = getIdentity();
  const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  const radarData = [
    { axis: 'Risk Appetite', value: identity.riskAppetite, fullMark: 100 },
    { axis: 'Innovation Bias', value: identity.innovationBias, fullMark: 100 },
    { axis: 'Loss Tolerance', value: identity.lossTolerance, fullMark: 100 },
    { axis: 'Contrarian Score', value: identity.contrarianScore, fullMark: 100 },
    { axis: 'Decision Speed', value: identity.decisionSpeed, fullMark: 100 },
    { axis: 'India Instinct', value: identity.indiaInstinct, fullMark: 100 },
  ];

  const summary = generateSummary(identity);

  if (identity.simulationResults.length < 2) {
    return (
      <div className="min-h-screen bg-[#07080D] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="font-display text-2xl text-white mb-4">Access Denied</div>
          <p className="font-body text-[#8A8F98] mb-6">Complete at least 2 simulations to unlock your Investor Report.</p>
          <button onClick={() => navigate('/')} className="font-mono text-sm text-[#00FF88] border border-[#00FF88] px-6 py-2 hover:bg-[#00FF88] hover:text-[#07080D]">
            {'<'} BACK TO HQ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080D] print-page">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Navigation - hidden in print */}
        <div className="no-print mb-8 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="font-mono text-xs text-[#8A8F98] hover:text-[#00FF88] tracking-widest">
            {'<'} BACK TO HQ
          </button>
          <button
            onClick={() => window.print()}
            className="font-mono text-xs text-[#00FF88] border border-[#00FF88] px-4 py-2 hover:bg-[#00FF88] hover:text-[#07080D] transition-colors"
          >
            DOWNLOAD AS PDF
          </button>
        </div>

        {/* Report Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b-2 border-[#1E2028] pb-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-mono text-[10px] text-[#8A8F98] tracking-widest">FINCRAFT INVESTOR REPORT</div>
              <div className="font-mono text-[10px] text-[#8A8F98] tracking-widest">CLASSIFIED // INTERNAL USE ONLY</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] text-[#8A8F98] tracking-widest">GENERATED</div>
              <div className="font-mono text-xs text-white">{date}</div>
            </div>
          </div>

          <h1 className="font-display text-4xl text-white tracking-widest uppercase mb-4">Investor Profile</h1>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#12141A] border border-[#1E2028] p-4 text-center">
              <div className="font-mono text-lg text-[#00FF88] font-bold">{identity.archetypeLabel}</div>
              <div className="font-mono text-[9px] text-[#8A8F98] tracking-widest mt-1">ARCHETYPE</div>
            </div>
            <div className="bg-[#12141A] border border-[#1E2028] p-4 text-center">
              <div className="font-mono text-lg text-white font-bold">{identity.totalDecisions}</div>
              <div className="font-mono text-[9px] text-[#8A8F98] tracking-widest mt-1">TOTAL DECISIONS</div>
            </div>
            <div className="bg-[#12141A] border border-[#1E2028] p-4 text-center">
              <div className="font-mono text-lg text-[#00FF88] font-bold">{identity.xp}</div>
              <div className="font-mono text-[9px] text-[#8A8F98] tracking-widest mt-1">XP EARNED</div>
            </div>
            <div className="bg-[#12141A] border border-[#1E2028] p-4 text-center">
              <div className="font-mono text-lg text-[#F5A623] font-bold">{identity.simulationResults.length}</div>
              <div className="font-mono text-[9px] text-[#8A8F98] tracking-widest mt-1">SIMULATIONS</div>
            </div>
          </div>
        </motion.div>

        {/* Financial Fingerprint */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <h2 className="font-display text-xl text-white tracking-widest uppercase mb-4">Financial Fingerprint</h2>
          <div className="bg-[#12141A] border border-[#1E2028] p-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#1E2028" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: '#8A8F98', fontSize: 10, fontFamily: 'IBM Plex Mono' }} />
                  <Radar dataKey="value" stroke="#00FF88" fill="#00FF88" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {radarData.map(d => (
                <div key={d.axis} className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#8A8F98]">{d.axis}</span>
                  <span className="text-[#00FF88]">{Math.round(d.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Simulation Performance Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <h2 className="font-display text-xl text-white tracking-widest uppercase mb-4">Simulation Performance</h2>
          <div className="bg-[#12141A] border border-[#1E2028] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1E2028]">
                  <th className="text-left font-mono text-[9px] text-[#8A8F98] tracking-widest p-3 uppercase">Scenario</th>
                  <th className="text-right font-mono text-[9px] text-[#8A8F98] tracking-widest p-3 uppercase">Return</th>
                  <th className="text-right font-mono text-[9px] text-[#8A8F98] tracking-widest p-3 uppercase">Bias Diagnosed</th>
                  <th className="text-right font-mono text-[9px] text-[#8A8F98] tracking-widest p-3 uppercase">Type</th>
                </tr>
              </thead>
              <tbody>
                {identity.simulationResults.map((result, i) => (
                  <tr key={i} className="border-b border-[#1E2028]/50">
                    <td className="font-body text-sm text-white p-3">{result.scenarioName}</td>
                    <td className={`font-mono text-sm p-3 text-right ${result.finalReturn >= 0 ? 'text-[#00FF88]' : 'text-[#FF2D55]'}`}>
                      {result.finalReturn >= 0 ? '+' : ''}{result.finalReturn.toFixed(1)}%
                    </td>
                    <td className="font-mono text-xs text-[#F5A623] p-3 text-right">{result.biasDiagnosed}</td>
                    <td className="font-mono text-xs text-[#8A8F98] p-3 text-right uppercase">{result.scenarioType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Decision Log */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
          <h2 className="font-display text-xl text-white tracking-widest uppercase mb-4">Decision Log</h2>
          <div className="bg-[#12141A] border border-[#1E2028] p-4 max-h-[400px] overflow-y-auto">
            <div className="space-y-2">
              {identity.decisions.slice(-20).reverse().map((d, i) => (
                <div key={i} className="border-b border-[#1E2028]/30 pb-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[#00FF88] tracking-widest">{d.scenarioName}</span>
                    <span className="font-mono text-[9px] text-[#8A8F98]">{d.scenarioType.toUpperCase()}</span>
                  </div>
                  <div className="font-body text-xs text-[#8A8F98] mt-1 italic">{d.annotation}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
          <h2 className="font-display text-xl text-white tracking-widest uppercase mb-4">Analysis Summary</h2>
          <div className="bg-[#12141A] border border-[#1E2028] p-6">
            <p className="font-body text-[#E8E8E8] leading-relaxed">{summary}</p>
          </div>
        </motion.div>

        {/* Final Verdict */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-center border-t-2 border-[#1E2028] pt-8">
          <div className="font-mono text-[10px] text-[#8A8F98] tracking-widest mb-2">FINAL VERDICT</div>
          <div className="font-display text-2xl text-[#00FF88] font-bold tracking-wider mb-2">{identity.archetypeLabel}</div>
          <div className="font-body text-sm text-[#8A8F98] italic max-w-lg mx-auto">
            {identity.riskAppetite > 60
              ? 'An aggressive operator who thrives in volatile markets. Best suited for high-conviction, concentrated portfolios.'
              : identity.contrarianScore > 60
              ? 'A contrarian thinker who finds value where others see risk. Best suited for deep-value and special situations.'
              : identity.innovationBias > 60
              ? 'A forward-looking strategist who bets on innovation. Best suited for growth and emerging market opportunities.'
              : 'A balanced strategist with broad market awareness. Best suited for diversified portfolio management.'}
          </div>
          <div className="font-mono text-[9px] text-[#8A8F98] tracking-widest mt-8">
            FINCRAFT // THINK LIKE THE ROOM THAT CHANGED HISTORY
          </div>
        </motion.div>
      </div>
    </div>
  );
}
