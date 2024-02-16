import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import NumberInput from "../NumberInput";

const mockHandleInput = jest.fn();

describe("NumberInput", () => {
  describe("Render", () => {
    it("renders with correct label", () => {
      render(<NumberInput labelText="labelText" name="my-name" placeholder={0} onChangeFunc={mockHandleInput} />);

      const input = screen.getByLabelText("labelText");

      expect(input).toBeInTheDocument();
    });
    it("renders with number input", () => {
      render(<NumberInput labelText="labelText" name="my-name" placeholder={0} onChangeFunc={mockHandleInput} />);

      const input = screen.getByRole("spinbutton");

      expect(input).toBeInTheDocument();
    });
  });
  describe("Action", () => {
    it("calls onChangeFunc when input value changes", () => {
      render(<NumberInput labelText="labelText" name="my-name" placeholder={0} onChangeFunc={mockHandleInput} />);

      const input = screen.getByRole("spinbutton");
      fireEvent.change(input, { target: { value: 3 } });

      expect(mockHandleInput).toBeCalled();
    });
  });
});
