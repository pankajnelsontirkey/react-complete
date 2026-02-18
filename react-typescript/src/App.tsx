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
    const updatedTodos = todos.filter((item) => item.id !== idToRemove);

    setTodos(updatedTodos);
  };

  return (
    <>
      <NewTodo onAddTodo={handleSaveTodos} />
      <Todos items={todos} onRemoveTodo={handleRemoveTodo} />
    </>
  );
}

export default App;
