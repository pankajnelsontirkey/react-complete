import { useState } from 'react';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSaveTodos: (newText: string) => void = (newText) => {
    const newTodo = new Todo(newText);
    setTodos((prevTodos) => prevTodos.concat(newTodo));
  };

  const handleRemoveTodo: (idToRemove: string) => void = (idToRemove) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== idToRemove));
  };

  return (
    <>
      <NewTodo onAddTodo={handleSaveTodos} />
      <Todos items={todos} onRemoveTodo={handleRemoveTodo} />
    </>
  );
}

export default App;
