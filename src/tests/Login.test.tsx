import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/Pages/Login";
import { renderer } from "./helpers";

const originalFetch = window.fetch;
describe("Login component testing", () => {
  beforeEach(() => {
    window.fetch = originalFetch;
    renderer(<Login />);
  });

  it("Should allow filling out form and submitting", async () => {
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

    const password = screen.getByLabelText("Password *");
    userEvent.type(password, "password");
    expect(password).toHaveValue("password");

    userEvent.click(screen.getByText("Submit"));

    waitForElementToBeRemoved(() => screen.getByText("Submit"));

    expect(window.fetch).toHaveBeenCalled();
  });

  it("Should not submit form if no email", () => {
    window.fetch = jest.fn();

    const password = screen.getByLabelText("Password *");
    userEvent.type(password, "password");

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).not.toHaveBeenCalled();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("Should not submit form if invalid email", () => {
    window.fetch = jest.fn();

    const email = screen.getByLabelText("Email *");
    userEvent.type(email, "jestUseremail.com");

    const password = screen.getByLabelText("Password *");
    userEvent.type(password, "password");

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).not.toHaveBeenCalled();
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
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

    const password = screen.getByLabelText("Password *");
    userEvent.type(password, "password");

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).toHaveBeenCalled();
    expect(await screen.findByText("Email is invalid")).toBeInTheDocument();
  });

  it("Should show error if credentials are incorrect", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      json: () =>
        Promise.resolve({
          error: "Incorrect username or password",
        }),
    });

    const email = screen.getByLabelText("Email *");
    userEvent.type(email, "jestUser@email.com");

    const password = screen.getByLabelText("Password *");
    userEvent.type(password, "incorrect");

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).toHaveBeenCalled();
    expect(
      await screen.findByText("Incorrect username or password")
    ).toBeInTheDocument();
  });
});
