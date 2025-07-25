export interface ICreateTodoBody {
  title: string;
  description?: string;
  userId: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  completed?: boolean;
  pinned?: boolean;
}

export interface IUpdateTodoBody {
  title?: string;
  description?: string;
  userId?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  completed?: boolean;
  pinned?: boolean;
}

export interface ITodoResponse {
  id: string;
  title: string;
  description?: string;
  userId: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  completed?: boolean;
  pinned?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
