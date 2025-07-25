export interface ICreateUserBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  avatarUrl?: string;
  bio?: string;
  birthday?: Date;
}

export interface IUpdateUserBody {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  bio?: string;
  birthday?: Date;
}

export interface IUserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  bio?: string;
  birthday?: Date;
  createdAt: Date;
  updatedAt: Date;
}
