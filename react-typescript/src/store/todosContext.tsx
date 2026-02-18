import { createContext, useState, type FC, type ReactNode } from 'react';

import Todo from '../models/todo';

interface ITodosContext {
  todos: Todo[];
  addToDo: (text: string) => void;
  removeToDo: (id: string) => void;
}

interface ITodosProviderProps {
  children?: ReactNode;
}

export const TodosContext = createContext<ITodosContext>({
  todos: [],
  addToDo: () => {},
  removeToDo: () => {}
});

const TodosContextProvider: FC<ITodosProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSaveTodos: (text: string) => void = (text) => {
    const newTodo = new Todo(text);
    setTodos((prevTodos) => prevTodos.concat(newTodo));
  };

  const handleRemoveTodo: (idToRemove: string) => void = (idToRemove) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== idToRemove));
  };

  const contextValue: ITodosContext = {
    todos: todos,
    addToDo: handleSaveTodos,
    removeToDo: handleRemoveTodo
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
