export interface User {
  sub: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  access_token: string;
}
