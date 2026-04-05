import { blackTuesday1929 } from './black-tuesday-1929';
import { indiaLiberalization1991 } from './india-liberalization-1991';
import { harshadMehta1992 } from './harshad-mehta-1992';
import { greatCollapse2008 } from './great-collapse-2008';

export type ThreatLevel = 'CRITICAL' | 'EXTREME' | 'SEVERE';

export interface MarketChoice {
  id: string;
  text: string;
  portfolioImpact: number;
  riskAppetite: number;
  innovationBias: number;
  lossTolerance: number;
  contrarianScore: number;
  decisionSpeed: number;
  indiaInstinct: number;
  annotation: string;
}

export interface MarketEvent {
  title: string;
  brief: string;
  choices: MarketChoice[];
}

export interface MarketCompany {
  name: string;
  sector: string;
  price: number;
  sparkline: number[];
  sentiment: string;
}

export interface SectorMomentum {
  name: string;
  momentum: number;
}

export interface MarketBriefing {
  date: string;
  context: string;
  fearGreed: number;
  sectors: SectorMomentum[];
  headlines: string[];
}

export interface MarketScenario {
  id: string;
  name: string;
  year: number;
  threatLevel: ThreatLevel;
  hook: string;
  legendaryInvestor: string;
  legendaryAction: string;
  briefing: MarketBriefing;
  companies: MarketCompany[];
  events: MarketEvent[];
  optimalPath: number[];
  biases: Record<string, string>;
}

export const marketScenarios: MarketScenario[] = [
  blackTuesday1929 as MarketScenario,
  indiaLiberalization1991 as MarketScenario,
  harshadMehta1992 as MarketScenario,
  greatCollapse2008 as MarketScenario,
];

export const allScenarioCards = [
  { id: blackTuesday1929.id, name: blackTuesday1929.name, year: blackTuesday1929.year, type: 'market' as const, threatLevel: blackTuesday1929.threatLevel, hook: blackTuesday1929.hook },
  { id: indiaLiberalization1991.id, name: indiaLiberalization1991.name, year: indiaLiberalization1991.year, type: 'market' as const, threatLevel: indiaLiberalization1991.threatLevel, hook: indiaLiberalization1991.hook },
  { id: harshadMehta1992.id, name: harshadMehta1992.name, year: harshadMehta1992.year, type: 'market' as const, threatLevel: harshadMehta1992.threatLevel, hook: harshadMehta1992.hook },
  { id: greatCollapse2008.id, name: greatCollapse2008.name, year: greatCollapse2008.year, type: 'market' as const, threatLevel: greatCollapse2008.threatLevel, hook: greatCollapse2008.hook },
];
