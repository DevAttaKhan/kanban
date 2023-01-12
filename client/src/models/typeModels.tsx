export interface AppContextProps {
  children: React.ReactNode;
}

export interface APIResponse {
  status: string;
  token: string;
  user: User;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  __v: number;
}

export interface ContextType {
  token: APIResponse | null;
  //   setToken: (token: APIResponse) => void;
  setToken: React.Dispatch<React.SetStateAction<APIResponse | null>>;
  tasks: TodoTaskType[];
  rerender: any;
  setTasks: React.Dispatch<React.SetStateAction<TodoTaskType[]>>;
  setRerender: (obj: any) => void;
}

export interface TodoTaskType {
  _id: string;
  userId: string;
  description: string;
  status: string;
  dueDate: string;
  __v: number;
}

export interface TodoTaskType {
  _id: string;
  userId: string;
  description: string;
  status: string;
  dueDate: string;
  __v: number;
}
