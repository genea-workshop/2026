export interface LeaderboardEntry {
  rank: number;
  modelName: string;
  motionRealismElo: number;
  motionRealismEloCI: [number, number];
  speechGestureAlignmentPercentage: number;
  speechGestureAlignmentPercentageCI: [number, number];
  websiteUrl?: string;
  systemDetailsUrl?: string;
  trainingHours?: number;
  venue?: string;
  year?: number;
}

export interface AutomatedEvaluationEntry {
  modelName: string;
  fgd: number;
  ba: number;
  srgr: number;
  divPose: number;
  divSample: number | null;
  websiteUrl?: string;
  venue?: string;
  year?: number;
}