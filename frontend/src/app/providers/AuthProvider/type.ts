export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
}
