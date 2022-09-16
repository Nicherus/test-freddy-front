import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "./index";

test("renders login", () => {
  render(<Dashboard />);
  const linkElement = screen.getByText("Login");
  expect(linkElement).toBeInTheDocument();
});
