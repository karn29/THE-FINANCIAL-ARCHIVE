import { netflix2011 } from './netflix-2011';
import { amazon2003 } from './amazon-2003';
import { infosys1999 } from './infosys-1999';
import { zomato2021 } from './zomato-2021';

export interface BoardroomDecision {
  id: string;
  title: string;
  consequence: string;
  riskAppetite: number;
  innovation: number;
  financialDiscipline: number;
  peopleBet: number;
  strategicClarity: number;
}

export interface BoardMember {
  name: string;
  title: string;
  stance: 'pro' | 'cautious';
  argument: string;
}

export interface BoardroomChartData {
  labels: string[];
  values: number[];
  label: string;
  crisisPoint: number;
  annotation: string;
}

export interface BoardroomScenario {
  id: string;
  company: string;
  year: number;
  stakes: string;
  situation: {
    revenue: string;
    growth: string;
    metric: string;
    brief: string;
  };
  crisis: {
    description: string;
    stakes: string;
  };
  chartData: BoardroomChartData;
  boardMembers: BoardMember[];
  decisions: BoardroomDecision[];
  historicalOutcome: {
    whatHappened: string;
    correctChoice: string;
    alternateHistories: Record<string, string>;
  };
}

export const boardroomScenarios: BoardroomScenario[] = [
  netflix2011 as BoardroomScenario,
  amazon2003 as BoardroomScenario,
  infosys1999 as BoardroomScenario,
  zomato2021 as BoardroomScenario,
];

export const allBoardroomCards = boardroomScenarios.map(s => ({
  id: s.id,
  company: s.company,
  year: s.year,
  type: 'boardroom' as const,
  stakes: s.stakes,
}));
