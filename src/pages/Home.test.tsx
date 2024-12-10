import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Home } from "./Home";

describe("Home Page Logic", () => {
  test("Отображаются начальные задачи и счетчик оставшихся", () => {
    render(<Home />);

    // Check that there are three tasks
    expect(screen.getByText("Тестовое задание")).toBeInTheDocument();
    expect(screen.getByText("Прекрасный код")).toBeInTheDocument();
    expect(screen.getByText("Покрытие тестами")).toBeInTheDocument();

    // One task is completed, so 2 tasks remain incomplete
    expect(screen.getByText(/2 items left/i)).toBeInTheDocument();
  });

  test("Можно добавить новую задачу по нажатию Enter", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("What needs to be done?");

    fireEvent.change(input, { target: { value: "Новая задача" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // Check that the new task is added
    expect(screen.getByText("Новая задача")).toBeInTheDocument();
    // Now there are 4 tasks, and all except one are incomplete -> 3 incomplete
    expect(screen.getByText(/3 items left/i)).toBeInTheDocument();
  });

  test("Можно переключать состояние задачи (toggle)", () => {
    render(<Home />);
    // Find the task "Тестовое задание", it is incomplete.
    const task = screen.getByText("Тестовое задание");
    // The checkbox is the first element in li before the label
    // eslint-disable-next-line testing-library/no-node-access
    const checkbox = task.previousElementSibling as HTMLElement;
    expect(checkbox).toHaveAttribute("role", "checkbox");

    fireEvent.click(checkbox);

    // After clicking, the task should be completed.
    // Completed tasks are rendered with line-through style, but we can check the counter
    expect(screen.getByText(/1 item left/i)).toBeInTheDocument();
    // There were 2 incomplete tasks, one became completed -> 1 remaining incomplete.
  });

  test("Фильтр 'Active' показывает только невыполненные задачи", () => {
    render(<Home />);
    const activeButton = screen.getByText("Active");

    fireEvent.click(activeButton);

    // Incomplete: "Тестовое задание" and "Покрытие тестами"
    expect(screen.getByText("Тестовое задание")).toBeInTheDocument();
    expect(screen.queryByText("Прекрасный код")).not.toBeInTheDocument(); // it is completed
    expect(screen.getByText("Покрытие тестами")).toBeInTheDocument();
  });

  test("Фильтр 'Completed' показывает только выполненные задачи", () => {
    render(<Home />);
    const completedButton = screen.getByText("Completed");

    fireEvent.click(completedButton);

    // Completed: "Прекрасный код"
    expect(screen.queryByText("Тестовое задание")).not.toBeInTheDocument();
    expect(screen.getByText("Прекрасный код")).toBeInTheDocument();
    expect(screen.queryByText("Покрытие тестами")).not.toBeInTheDocument();
  });

  test("Кнопка 'Clear completed' удаляет выполненные задачи и фильтр 'clear' скрывает все", () => {
    render(<Home />);
    const clearCompletedButton = screen.getByText("Clear completed");

    fireEvent.click(clearCompletedButton);

    // "Прекрасный код" was completed and should now be removed
    expect(screen.queryByText("Прекрасный код")).not.toBeInTheDocument();

    // The filter is set to "clear", so the list is empty now
    expect(screen.queryByText("Тестовое задание")).not.toBeInTheDocument();
    expect(screen.queryByText("Покрытие тестами")).not.toBeInTheDocument();

    // The counter should not be shown because there are no visible todos (but they are actually cleared)
    // Since the array is now empty, the footer may disappear or remain. If it remains, you can check:
    // But since the "clear" filter now returns [], the list is empty.
  });
});
