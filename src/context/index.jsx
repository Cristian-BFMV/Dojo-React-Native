import { createContext, useState, useCallback } from 'react';

export const TodoContext = createContext({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
});

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback(todoTitle => {
    setTodos(prevTodos => [...prevTodos, { id: prevTodos.length + 1, todoTitle }]);
  }, []);

  const deleteTodo = useCallback(todoId => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  }, []);

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
