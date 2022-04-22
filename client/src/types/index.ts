export type User = {
  id: number;
  username: string;
  email: string;
  photoUrl: string | null;
  password: string;
  salt: string | null;
  token: string | null;
};
