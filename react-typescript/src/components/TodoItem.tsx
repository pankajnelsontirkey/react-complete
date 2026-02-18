import type { FC } from 'react';

import type Todo from '../models/todo';
import classes from './TodoItem.module.css';

const TodoItem: FC<Pick<Todo, 'text'> & { handleRemoveTodo: () => void }> = ({
  text,
  handleRemoveTodo
}) => {
  return (
    <li className={classes.item} onClick={handleRemoveTodo}>
      {text}
    </li>
  );
};

export default TodoItem;
