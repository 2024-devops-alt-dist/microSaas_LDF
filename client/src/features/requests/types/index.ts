export const RequestRole = {
  LEARNER: 'LEARNER',
  MENTOR: 'MENTOR',
} as const;

export type RequestRoleType = (typeof RequestRole)[keyof typeof RequestRole];

export interface MatchCriteria {
  role: RequestRoleType;
  language: string;
  level: string;
}

export interface CreateJoinRequestPayload {
  circleId: string;
  matchCriteria: MatchCriteria;
}
