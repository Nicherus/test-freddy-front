import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./index";

test("renders login", () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const linkElement = screen.getAllByText("Login");
  expect(linkElement[0]).toBeInTheDocument();
});
