import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../components/Register";
import { renderer } from "./helpers";

const originalFetch = window.fetch;
describe("Register component testing", () => {
  beforeEach(() => {
    window.fetch = originalFetch;
    renderer(<Register />);
  });

  it("Should allow filling out form and submitting", () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () =>
        Promise.resolve({
          email: "jestUser@email.com",
          username: "jestUser",
          userId: 99,
          token: "2f4dfd",
          expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        }),
    });

    const email = screen.getByLabelText("Email *");
    userEvent.type(email, "jestUser@email.com");
    expect(email).toHaveValue("jestUser@email.com");

    const username = screen.getByLabelText("Username *");
    userEvent.type(username, "jestUser");
    expect(username).toHaveValue("jestUser");

    const password = screen.getByLabelText("Password *");
    userEvent.type(password, "password");
    expect(password).toHaveValue("password");

    const confirmPassword = screen.getByLabelText("Confirm Password *");
    userEvent.type(confirmPassword, "password");
    expect(confirmPassword).toHaveValue("password");

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).toHaveBeenCalled();
  });

  it("Should not submit form if no email", () => {
    window.fetch = jest.fn();

    const username = screen.getByLabelText("Username *");
    userEvent.type(username, "jestUser");

    const password = screen.getByLabelText("Password *");
    userEvent.type(password, "password");

    const confirmPassword = screen.getByLabelText("Confirm Password *");
    userEvent.type(confirmPassword, "password");

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).not.toHaveBeenCalled();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });
});
