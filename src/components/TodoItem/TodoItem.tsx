import React from "react";
import { Todo } from "../../types/Todo";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  key: number;
}

export const TodoItem = ({ todo, onToggle }: TodoItemProps) => {
  return (
    <li
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}
    >
      <div className={styles.todoView}>
        <Checkbox.Root
          className={styles.checkboxRoot}
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
        >
          <Checkbox.Indicator className={styles.checkboxIndicator}>
            <CheckIcon width="100%" height="100%" />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <label className={styles.todoLabel}>{todo.title}</label>
      </div>
    </li>
  );
};
