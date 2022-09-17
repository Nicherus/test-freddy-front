// import React from "react";
import { render, screen } from "@testing-library/react";
import Orders from "./index";

test("renders dashboard", () => {
  render(<Orders />);
  const linkElement = screen.getByText("Orders");
  expect(linkElement).toBeInTheDocument();
});
