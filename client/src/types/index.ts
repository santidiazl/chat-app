export type User = {
  id: number;
  username: string;
  email: string;
  photoUrl: string;
  password: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
};
