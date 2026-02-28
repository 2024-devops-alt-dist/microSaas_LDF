export interface User {
  sub: string;
  email: string;
  name?: string;
  timezone?: string;
  avatar?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}
