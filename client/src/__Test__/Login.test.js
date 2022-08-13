import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "../pages";

test("user email input should be empty", () => {
  render(<Login />);

  const inputNode = screen.getByLabelText(/account type/i);

  expect(inputNode.value).toBe("").toBeInTheDocument("");
});

test("user password input should be empty", () => {
  render(<Login />);

  const inputNode = screen.getByLabelText(/password/i);

  expect(inputNode.value).toBe("").toBeInTheDocument("");
});

test("user email should be rerender", () => {
  render(<Login />);

  const inputNode = screen.getByLabelText(/email/i);

  expect(inputNode).toBeInTheDocument();
});

test("button should be disabled", () => {
  render(<Login />);

  const inputNode = screen.getByRole("button");

  expect(inputNode).toBeDisabled();
});

test("email input should be changed", () => {
  render(<Login />);

  const inputNode = screen.getByLabelText(/email/i);
  const testValue = "test@gmail.com";

  fireEvent.change(inputNode, { target: { value: testValue } });
  expect(inputNode.value).toBe(testValue);
});

test("password input should be changed", () => {
  render(<Login />);

  const inputNode = screen.getByLabelText(/password/i);
  const testValue = "test";

  fireEvent.change(inputNode, { target: { value: testValue } });
  expect(inputNode.value).toBe(testValue);
});
