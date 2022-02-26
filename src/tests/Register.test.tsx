import { screen, waitForElementToBeRemoved } from "@testing-library/react";
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

    waitForElementToBeRemoved(() => screen.getByText("Submit"));

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

  it("Should not submit form if invalid email", () => {
    window.fetch = jest.fn();

    const email = screen.getByLabelText("Email *");
    userEvent.type(email, "jestUseremail.com");

    const username = screen.getByLabelText("Username *");
    userEvent.type(username, "jestUser");

    const password = screen.getByLabelText("Password *");
    userEvent.type(password, "password");

    const confirmPassword = screen.getByLabelText("Confirm Password *");
    userEvent.type(confirmPassword, "password");

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).not.toHaveBeenCalled();
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("Should not submit form if password do not match", () => {
    window.fetch = jest.fn();

    const email = screen.getByLabelText("Email *");
    userEvent.type(email, "jestUser@email.com");

    const username = screen.getByLabelText("Username *");
    userEvent.type(username, "jestUser");

    const password = screen.getByLabelText("Password *");
    userEvent.type(password, "password");

    const confirmPassword = screen.getByLabelText("Confirm Password *");
    userEvent.type(confirmPassword, "different");

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).not.toHaveBeenCalled();
    expect(screen.getByText("Does not match Password")).toBeInTheDocument();
  });

  it("Should not submit form if username exceeds maxLength", () => {
    window.fetch = jest.fn();

    const email = screen.getByLabelText("Email *");
    userEvent.type(email, "jestUser@email.com");

    const username = screen.getByLabelText("Username *");
    userEvent.type(username, "j".repeat(33));

    const password = screen.getByLabelText("Password *");
    userEvent.type(password, "password");

    const confirmPassword = screen.getByLabelText("Confirm Password *");
    userEvent.type(confirmPassword, "password");

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).not.toHaveBeenCalled();
    expect(screen.getByText("Maximum length is 32")).toBeInTheDocument();
  });

  it("Should not submit form if username less than minLength", () => {
    window.fetch = jest.fn();

    const email = screen.getByLabelText("Email *");
    userEvent.type(email, "jestUser@email.com");

    const username = screen.getByLabelText("Username *");
    userEvent.type(username, "jes");

    const password = screen.getByLabelText("Password *");
    userEvent.type(password, "password");

    const confirmPassword = screen.getByLabelText("Confirm Password *");
    userEvent.type(confirmPassword, "password");

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).not.toHaveBeenCalled();
    expect(screen.getByText("Minimum length is 4")).toBeInTheDocument();
  });

  it("Should show error if email already exists", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      json: () =>
        Promise.resolve({
          error: "email already exists",
        }),
    });

    const email = screen.getByLabelText("Email *");
    userEvent.type(email, "jestUser@email.com");

    const username = screen.getByLabelText("Username *");
    userEvent.type(username, "jestUser");

    const password = screen.getByLabelText("Password *");
    userEvent.type(password, "password");

    const confirmPassword = screen.getByLabelText("Confirm Password *");
    userEvent.type(confirmPassword, "password");

    userEvent.click(screen.getByText("Submit"));

    // expect(window.fetch).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalled();
    expect(await screen.findByText("Email already exists")).toBeInTheDocument();
  });

  it("Should show error if username already exists", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      json: () =>
        Promise.resolve({
          error: "username already exists",
        }),
    });

    const email = screen.getByLabelText("Email *");
    userEvent.type(email, "jestUser@email.com");

    const username = screen.getByLabelText("Username *");
    userEvent.type(username, "jestUser");

    const password = screen.getByLabelText("Password *");
    userEvent.type(password, "password");

    const confirmPassword = screen.getByLabelText("Confirm Password *");
    userEvent.type(confirmPassword, "password");

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).toHaveBeenCalled();
    expect(
      await screen.findByText("Username already exists")
    ).toBeInTheDocument();
  });

  it("Should show error if email invalid format on backend", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      json: () =>
        Promise.resolve({
          error: '"email" must be a valid email',
        }),
    });

    const email = screen.getByLabelText("Email *");
    userEvent.type(email, "jestUser@email.comc");

    const username = screen.getByLabelText("Username *");
    userEvent.type(username, "jestUser");

    const password = screen.getByLabelText("Password *");
    userEvent.type(password, "password");

    const confirmPassword = screen.getByLabelText("Confirm Password *");
    userEvent.type(confirmPassword, "password");

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).toHaveBeenCalled();
    expect(await screen.findByText("Email is invalid")).toBeInTheDocument();
  });
});
