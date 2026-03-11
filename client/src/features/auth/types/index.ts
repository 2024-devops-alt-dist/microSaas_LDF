export interface User {
  sub: string;
  email: string;
  name?: string;
  timezone?: string;
  nativeLanguages?: string[];
  targetLanguages?: { language: string; level: string }[];
  avatar?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}
