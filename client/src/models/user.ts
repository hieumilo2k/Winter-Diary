export interface UserInformation {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  diaries: [];
}

export interface UpdateUser {
  firstName: string;
  lastName: string;
  avatar: string;
  password: string;
}
