import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Orders from "./index";

test("renders orders page", () => {
  render(
    <Router>
      <Orders />
    </Router>
  );
  const linkElement = screen.getAllByText("Orders");
  expect(linkElement[0]).toBeInTheDocument();
});
