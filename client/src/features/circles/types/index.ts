export interface Member {
  name: string;
  target_languages: string[];
  isMentor: boolean;
}

export interface Mentor extends Member {
  mastered_languages: string[];
  native: boolean;
  certification?: string;
}

export interface Learner extends Member {
  learning_language: string;
}

interface BaseCircle {
  id: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface PracticeCircle extends BaseCircle {
  type: 'practice';
  language: string;
  members: Member[];
}

export interface ExchangeCircle extends BaseCircle {
  type: 'exchange';
  languages: [string, string];
  mentors: [Mentor, Mentor];
  learners: Learner[];
}

export type Circle = PracticeCircle | ExchangeCircle;

export interface ICircleService {
  getMyCircles(): Promise<Circle[]>;
  getAvailableCircles(): Promise<Circle[]>;
  requestToJoinCircle(circleId: string): Promise<Circle>;
  leaveCircle(circleId: string): Promise<{ success: boolean }>;
}
