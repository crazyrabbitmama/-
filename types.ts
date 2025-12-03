export enum GamePhase {
  INTRO = 'INTRO',
  WEEKLY_LOOP = 'WEEKLY_LOOP',
  EVENT_RESULT = 'EVENT_RESULT',
  INTERVIEW = 'INTERVIEW',
  ENDING = 'ENDING',
  SCAM_CALL = 'SCAM_CALL'
}

export enum ActionType {
  WORK = 'WORK',
  STUDY = 'STUDY',
  COMM = 'COMM',
  RELAX = 'RELAX',
  FAMILY = 'FAMILY',
  PORTFOLIO = 'PORTFOLIO'
}

export interface PlayerStats {
  skill: number;
  comm: number;
  mood: number;
  family: number;
  money: number;
}

export interface GameState {
  phase: GamePhase;
  week: number;
  day: number;
  stats: PlayerStats;
  history: string[]; // Log of last few events
  passedInterviews: number;
  currentEvent: GameEvent | null;
  currentEventResultText: string;
  currentEventImage: string | null; // Base64 image
  isGenerating: boolean; // Loading state
  ending: EndingType | null;
}

export interface GameEvent {
  id: string;
  title: string;
  text: string;
  effects: Partial<PlayerStats>;
  condition?: (stats: PlayerStats) => boolean;
  probability?: number; // 0-1
}

export enum EndingType {
  GE3 = "家里有矿",
  GE1 = "大厂offer",
  GE2 = "中彩票",
  GE4 = "自洽人生",
  BE1 = "心态爆炸",
  BE2 = "被迫相亲",
  BE3 = "打工还贷",
  BE4 = "被骗个精光",
  NE = "挂面大王"
}

export interface InterviewConfig {
  week: number;
  title: string;
  description: string;
  passCondition: (stats: PlayerStats) => boolean;
  failPenalty: Partial<PlayerStats>;
}