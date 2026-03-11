export interface UserProfile {
  _id: string;
  name: string;
  email?: string;
  fluentLanguages: string;
  targetLanguages: TargetLanguage[];
  avatarUrl?: string;
}

export interface TargetLanguage {
  language: string;
  level: string;
}
