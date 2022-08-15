export interface Register {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface Login {
  username: string;
  password: string;
}
