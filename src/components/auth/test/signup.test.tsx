import React from "react";
import { render } from "@testing-library/react";
import SignUp from "../SignUp";
import userEvent from "@testing-library/user-event";
test("renders learn react link", async () => {
  const { getByLabelText, debug } = render(<SignUp />);
  const userNameInput = getByLabelText(/username/i);
  debug(userNameInput);
  userEvent.type(userNameInput, "Bitch");
  //   expect(userNameInput).toHaveTextContent("Bitch");
});
describe("check it works", () => {});
