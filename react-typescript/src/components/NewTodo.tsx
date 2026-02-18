import { useContext, useRef, type FC, type SubmitEvent } from 'react';

import { TodosContext } from '../store/todosContext';
import classes from './NewTodo.module.css';

const NewTodo: FC = () => {
  const { addToDo } = useContext(TodosContext);
  const todoTextRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const enteredText = todoTextRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }

    addToDo(enteredText.trim());

    todoTextRef.current!.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <label htmlFor='todoText'>Todo Title</label>
      <input type='text' name='todoText' id='todoText' ref={todoTextRef} />
      <button type='submit'>Add Todo</button>
    </form>
  );
};

export default NewTodo;
