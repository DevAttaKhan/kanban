import react, { useState } from "react";
import { ContextType, APIResponse, TodoTaskType } from "./models/typeModels";

export const AppState = react.createContext<ContextType>({
  token: null,
  tasks: [],
  rerender: {},
  setTasks: () => {},
  setToken: () => {},
  setRerender: () => {},
});

const AppContext: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<APIResponse | null>(null);
  const [tasks, setTasks] = useState<TodoTaskType[]>([]);
  const [rerender, setRerender] = useState({});

  return (
    <AppState.Provider
      value={{ token, setToken, tasks, setTasks, rerender, setRerender }}
    >
      {children}
    </AppState.Provider>
  );
};

export default AppContext;
