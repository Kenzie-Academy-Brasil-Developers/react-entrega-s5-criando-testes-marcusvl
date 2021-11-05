import React from "react";
import { render, screen } from "@testing-library/react";
import Search from "../../components/Search";

describe("Button Component", () => {
  test("Should be able to render a button", () => {
    render(<Search />);
    const buttonElement = screen.getByText(/Buscar pelo CEP/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
