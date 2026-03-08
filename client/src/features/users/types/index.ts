export interface UserProfile {
  _id: string;
  name: string;
  email?: string;
  learningLanguage: string;
  targetLanguages: string[];
  avatarUrl?: string;
}
