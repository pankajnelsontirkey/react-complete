import type { FC } from 'react';

import type Todo from '../models/todo';
import classes from './TodoItem.module.css';

const TodoItem: FC<
  Todo & { handleRemoveTodo: (idToRemove: string) => void }
> = ({ id, text, handleRemoveTodo }) => {
  return (
    <li className={classes.item} onClick={() => handleRemoveTodo(id)}>
      {text}
    </li>
  );
};

export default TodoItem;
