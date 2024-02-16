import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../page";

describe("Home", () => {
  it("2 inputs with type='number and 2 buttons'", async () => {
    render(<Home />);

    const numberInputs = screen.getAllByRole("spinbutton");
    const buttons = screen.getAllByRole("button");

    expect(numberInputs.length).toBe(2);
    expect(buttons.length).toBe(2);
  });
});
