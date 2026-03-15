export interface User {
  userId: string;
  sub: string;
  email: string;
  name?: string;
  timezone?: string;
  nativeLanguages?: string[];
  targetLanguages?: { language: string; level: string }[];
  avatarURL?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}
