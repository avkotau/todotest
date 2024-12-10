import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app without learn react link", () => {
  render(<App />);
  // Здесь ранее искался "learn react", но в текущем приложении этого текста нет.
  // Можно написать новый тест или оставить этот пустым, если не нужен.
  // Например, проверить что заголовок "todos" отображается:
  const titleElement = screen.getByText(/todos/i);
  expect(titleElement).toBeInTheDocument();
});
