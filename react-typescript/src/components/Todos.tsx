import { useContext, type FC } from 'react';

import { TodosContext } from '../store/todosContext';
import TodoItem from './TodoItem';
import classes from './Todos.module.css';

const Todos: FC = () => {
  const { todos, removeToDo } = useContext(TodosContext);

  return (
    <ul className={classes.todos}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          handleRemoveTodo={removeToDo.bind(null, todo.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;
