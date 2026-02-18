export interface User {
  sub: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}
