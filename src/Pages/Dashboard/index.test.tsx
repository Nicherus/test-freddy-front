// import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "./index";

test("renders dashboard", () => {
  render(<Dashboard />);
  const linkElement = screen.getByText("Dashboard");
  expect(linkElement).toBeInTheDocument();
});
