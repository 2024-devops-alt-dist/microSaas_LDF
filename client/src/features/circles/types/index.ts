export interface UserProfile {
  _id: string;
  name: string;
  email?: string;
  learningLanguage: string;
  targetLanguages: string[];
  avatarUrl?: string;
  certification?: string;
}

export interface CircleMember {
  user: UserProfile;
  role: 'admin' | 'moderator' | 'member' | 'mentor';
  joinedAt?: Date;
}
interface BaseCircle {
  _id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  members: CircleMember[];
}

export interface PracticeCircle extends BaseCircle {
  type: 'practice';
  language: string;
}

export interface ExchangeCircle extends BaseCircle {
  type: 'exchange';
  languages: [string, string];
}

export type Circle = PracticeCircle | ExchangeCircle;

export interface ICircleService {
  getMyCircles(userId: string): Promise<Circle[]>;
  getAvailableCircles(): Promise<Circle[]>;
  requestToJoinCircle(circleId: string): Promise<Circle>;
  leaveCircle(circleId: string): Promise<{ success: boolean }>;
  getCirclesByType(type: string): Promise<Circle[]>;
  getCircleById(id: string): Promise<Circle>;
  approveRequest(circleId: string, userId: string): Promise<Circle>;
}
