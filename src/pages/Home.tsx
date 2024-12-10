import React, { useState, useCallback, useMemo } from "react";
import { Todo } from "../types/Todo";
import { TodoItem } from "../components/TodoItem/TodoItem";
import styles from "./Home.module.css";
import { ChevronDownIcon } from "@radix-ui/react-icons";

type Filter = "all" | "active" | "completed" | "clear";

export const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Тестовое задание", completed: false },
    { id: 2, title: "Прекрасный код", completed: true },
    { id: 3, title: "Покрытие тестами", completed: false },
  ]);

  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [filter, setFilter] = useState<Filter>("all");

  const handleAddTodo = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && newTodoTitle.trim()) {
        const newTodo: Todo = {
          id: Date.now(),
          title: newTodoTitle.trim(),
          completed: false,
        };
        setTodos((prev) => [...prev, newTodo]);
        setNewTodoTitle("");
      }
    },
    [newTodoTitle],
  );

  const handleToggle = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const handleClearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      case "clear":
        return [];
      default:
        return todos;
    }
  }, [todos, filter]);

  const itemsLeft = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos],
  );

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>todos</h1>

      <div className={styles.todoapp}>
        <header className={styles.header}>
          <ChevronDownIcon className={styles.icon} />
          <input
            className={styles.newTodo}
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            onKeyDown={handleAddTodo}
          />
        </header>
        <section className={styles.main}>
          {todos.length > 0 && (
            <ul className={styles.todoList}>
              {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
              ))}
            </ul>
          )}
        </section>
        {todos.length > 0 && (
          <footer className={styles.footer}>
            <span className={styles.todoCount}>
              {itemsLeft} item{itemsLeft !== 1 ? "s" : ""} left
            </span>
            <ul className={styles.filters}>
              <li>
                <button
                  className={filter === "all" ? styles.selected : ""}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className={filter === "active" ? styles.selected : ""}
                  onClick={() => setFilter("active")}
                >
                  Active
                </button>
              </li>
              <li>
                <button
                  className={filter === "completed" ? styles.selected : ""}
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </button>
              </li>
              <li>
                <button
                  className={filter === "clear" ? styles.selected : ""}
                  onClick={() => {
                    handleClearCompleted();
                    setFilter("clear");
                  }}
                >
                  Clear completed
                </button>
              </li>
            </ul>
          </footer>
        )}
      </div>
    </div>
  );
};
