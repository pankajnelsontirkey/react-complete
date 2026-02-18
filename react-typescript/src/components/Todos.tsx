import type { FC } from 'react';

import type Todo from '../models/todo';
import TodoItem from './TodoItem';
import classes from './Todos.module.css';

const Todos: FC<
  { items: Todo[] } & { onRemoveTodo: (idToRemove: string) => void }
> = ({ items, onRemoveTodo }) => {
  return (
    <ul className={classes.todos}>
      {items.map((item) => (
        <TodoItem key={item.id} {...item} handleRemoveTodo={onRemoveTodo} />
      ))}
    </ul>
  );
};

export default Todos;
