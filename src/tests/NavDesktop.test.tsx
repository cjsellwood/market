import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavDesktop from "../components/Navigation/NavDesktop";
import { renderer } from "./helpers";

describe("NavDesktop component", () => {
  test("Can logout on desktop", () => {
    renderer(<NavDesktop />, {
      auth: { userId: 99 },
    });

    userEvent.click(screen.getByText("Log Out"));

    expect(screen.queryByText("Login")).toBeInTheDocument();
    expect(screen.queryByText("Register")).toBeInTheDocument();
    expect(screen.queryByText("Log Out")).not.toBeInTheDocument();
    expect(screen.queryByText("You are now logged out")).toBeInTheDocument();
  });
});
