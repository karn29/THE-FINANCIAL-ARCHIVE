// localStorage utility for Career Identity persistence

export interface Decision {
  id: string;
  scenarioId: string;
  scenarioName: string;
  scenarioType: 'market' | 'boardroom';
  choice: string;
  annotation: string;
  timestamp: number;
  impact: {
    riskAppetite: number;
    innovationBias: number;
    lossTolerance: number;
    contrarianScore: number;
    decisionSpeed: number;
    indiaInstinct: number;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: number;
}

export interface SimulationResult {
  scenarioId: string;
  scenarioName: string;
  scenarioType: 'market' | 'boardroom';
  finalReturn: number;
  benchmark: number;
  biasDiagnosed: string;
  biasDescription: string;
  archetypeLabel: string;
  completedAt: number;
  decisions: Decision[];
}

export interface CareerIdentity {
  riskAppetite: number;
  innovationBias: number;
  lossTolerance: number;
  contrarianScore: number;
  decisionSpeed: number;
  indiaInstinct: number;
  xp: number;
  streak: number;
  lastPlayDate: string;
  archetypeLabel: string;
  decisions: Decision[];
  badges: Badge[];
  simulationResults: SimulationResult[];
  totalDecisions: number;
  background: string;
}

const DEFAULT_IDENTITY: CareerIdentity = {
  riskAppetite: 50,
  innovationBias: 50,
  lossTolerance: 50,
  contrarianScore: 50,
  decisionSpeed: 50,
  indiaInstinct: 0,
  xp: 0,
  streak: 0,
  lastPlayDate: '',
  archetypeLabel: 'UNKNOWN OPERATOR',
  decisions: [],
  badges: [],
  simulationResults: [],
  totalDecisions: 0,
  background: '',
};

export function getIdentity(): CareerIdentity {
  try {
    const stored = localStorage.getItem('fincraft_identity');
    if (stored) {
      return { ...DEFAULT_IDENTITY, ...JSON.parse(stored) };
    }
  } catch {}
  return { ...DEFAULT_IDENTITY };
}

export function saveIdentity(identity: CareerIdentity): void {
  localStorage.setItem('fincraft_identity', JSON.stringify(identity));
}

export function addDecision(decision: Decision): CareerIdentity {
  const identity = getIdentity();
  identity.decisions.push(decision);
  identity.totalDecisions++;
  
  // Update fingerprint axes
  const { impact } = decision;
  const weight = 0.15;
  identity.riskAppetite = clamp(identity.riskAppetite + impact.riskAppetite * weight);
  identity.innovationBias = clamp(identity.innovationBias + impact.innovationBias * weight);
  identity.lossTolerance = clamp(identity.lossTolerance + impact.lossTolerance * weight);
  identity.contrarianScore = clamp(identity.contrarianScore + impact.contrarianScore * weight);
  identity.decisionSpeed = clamp(identity.decisionSpeed + impact.decisionSpeed * weight);
  if (impact.indiaInstinct !== 0) {
    identity.indiaInstinct = clamp(identity.indiaInstinct + impact.indiaInstinct * weight);
  }
  
  // Update archetype
  identity.archetypeLabel = computeArchetype(identity);
  
  // Add XP
  const xpGain = Math.abs(impact.contrarianScore) > 10 ? 150 : 100;
  identity.xp += xpGain;
  
  // Update streak
  const today = new Date().toISOString().slice(0, 10);
  if (identity.lastPlayDate === today) {
    // Same day, no streak change
  } else {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (identity.lastPlayDate === yesterday) {
      identity.streak++;
    } else if (identity.lastPlayDate) {
      identity.streak = 1;
    } else {
      identity.streak = 1;
    }
    identity.lastPlayDate = today;
  }
  
  saveIdentity(identity);
  return identity;
}

export function addSimulationResult(result: SimulationResult): CareerIdentity {
  const identity = getIdentity();
  identity.simulationResults.push(result);
  identity.archetypeLabel = computeArchetype(identity);
  saveIdentity(identity);
  return identity;
}

export function addBadge(badge: Badge): CareerIdentity {
  const identity = getIdentity();
  if (!identity.badges.find(b => b.id === badge.id)) {
    identity.badges.push(badge);
    identity.xp += 200;
    saveIdentity(identity);
  }
  return identity;
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function computeArchetype(identity: CareerIdentity): string {
  if (identity.totalDecisions < 3) return 'UNKNOWN OPERATOR';
  
  const { riskAppetite, innovationBias, lossTolerance, contrarianScore, indiaInstinct } = identity;
  
  if (contrarianScore > 70 && riskAppetite > 60) return 'CONTRARIAN HAWK';
  if (indiaInstinct > 60 && riskAppetite > 50) return 'INDIA BULL';
  if (lossTolerance > 70 && riskAppetite > 70) return 'CRISIS HUNTER';
  if (lossTolerance > 60 && riskAppetite < 40) return 'DEFENSIVE ACCUMULATOR';
  if (riskAppetite > 80 && contrarianScore > 60) return 'CHAOS TRADER';
  if (innovationBias > 70 && lossTolerance > 50) return 'LONG-TERM VISIONARY';
  if (riskAppetite < 30 && innovationBias < 40) return 'CONSERVATIVE GUARDIAN';
  if (innovationBias > 60) return 'INNOVATION SEEKER';
  
  return 'BALANCED STRATEGIST';
}

// Leaderboard
export interface LeaderboardEntry {
  name: string;
  returnPct: number;
  archetype: string;
}

export function getLeaderboard(scenarioId: string): LeaderboardEntry[] {
  try {
    const stored = localStorage.getItem(`fincraft_leaderboard_${scenarioId}`);
    if (stored) return JSON.parse(stored);
  } catch {}
  return generateDefaultLeaderboard();
}

export function addToLeaderboard(scenarioId: string, entry: LeaderboardEntry): void {
  const board = getLeaderboard(scenarioId);
  board.push(entry);
  board.sort((a, b) => b.returnPct - a.returnPct);
  localStorage.setItem(`fincraft_leaderboard_${scenarioId}`, JSON.stringify(board.slice(0, 10)));
}

function generateDefaultLeaderboard(): LeaderboardEntry[] {
  const names = [
    'Arjun Mehta', 'Priya Sharma', 'Vikram Patel', 'Ananya Reddy', 'Rohan Gupta',
    'Kavita Nair', 'Aditya Singh', 'Neha Joshi', 'Rahul Verma', 'Sneha Iyer'
  ];
  const archetypes = ['CONTRARIAN HAWK', 'INDIA BULL', 'CRISIS HUNTER', 'CHAOS TRADER', 'LONG-TERM VISIONARY'];
  return names.map(name => ({
    name,
    returnPct: Math.round((Math.random() * 80 - 20) * 10) / 10,
    archetype: archetypes[Math.floor(Math.random() * archetypes.length)],
  })).sort((a, b) => b.returnPct - a.returnPct);
}

// Vote tracking for multiplayer boardroom
export function getVotes(scenarioId: string): Record<string, { total: number; finance: number; mba: number }> {
  try {
    const stored = localStorage.getItem(`fincraft_votes_${scenarioId}`);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

export function addVote(scenarioId: string, choiceId: string, background: string): Record<string, { total: number; finance: number; mba: number }> {
  const votes = getVotes(scenarioId);
  if (!votes[choiceId]) {
    votes[choiceId] = { total: 0, finance: 0, mba: 0 };
  }
  votes[choiceId].total++;
  if (background === 'finance') votes[choiceId].finance++;
  if (background === 'mba') votes[choiceId].mba++;
  localStorage.setItem(`fincraft_votes_${scenarioId}`, JSON.stringify(votes));
  return votes;
}
