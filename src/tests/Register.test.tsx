import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../components/Register";
import { renderer } from "./helpers";

describe("Register component testing", () => {
  beforeEach(() => {
    renderer(<Register />);
  });

  it("Should allow filling out form and submitting", () => {
    const email = screen.getByLabelText("Email");
    userEvent.type(email, "JestUser");
    expect(email).toHaveValue("JestUser");

    const username = screen.getByLabelText("Username");
    userEvent.type(username, "JestUser@email.com");
    expect(username).toHaveValue("JestUser@email.com");

    const password = screen.getByLabelText("Password");
    userEvent.type(password, "password");
    expect(password).toHaveValue("password");

    const confirmPassword = screen.getByLabelText("Confirm Password");
    userEvent.type(confirmPassword, "password");
    expect(confirmPassword).toHaveValue("password");

    userEvent.click(screen.getByText("Submit"));

  });
});
