import { createContext } from 'react';

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  return <TodoContext.Provider>{children}</TodoContext.Provider>;
};

export default TodoProvider;
