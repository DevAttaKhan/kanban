import react, { useState, useEffect } from "react";
import API from "./api/api";

export interface APIResponse {
  status: string;
  token: string;
  data: Data;
}

export interface Data {
  user: User;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  __v: number;
}

interface AppContextProps {
  children: React.ReactNode;
}

interface ContextType {
  token?: APIResponse;
  setToken: (token: APIResponse) => void;
}

export interface TodoTaskType {
  _id: string;
  userId: string;
  description: string;
  status: string;
  dueDate: string;
  __v: number;
}

export const AppState = react.createContext<any | null>(null);

const AppContext = (props: AppContextProps) => {
  const [token, setToken] = useState<APIResponse | undefined>();
  const [tasks, setTasks] = useState<TodoTaskType[]>([]);
  const [rerender, setRerender] = useState({});

  return (
    <AppState.Provider
      value={{ token: token, setToken, tasks, setTasks, rerender, setRerender }}
    >
      {props.children}
    </AppState.Provider>
  );
};

export default AppContext;
