import NavDrawer from "../components/Navigation/NavDrawer";
import { renderer } from "./helpers";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("NavDrawer component", () => {
  test("Show login and register to user not logged in", () => {
    renderer(<NavDrawer isOpen={true} onClose={() => {}} />);

    expect(screen.queryByText("Login")).toBeInTheDocument();
    expect(screen.queryByText("Register")).toBeInTheDocument();
    expect(screen.queryByText("Log Out")).not.toBeInTheDocument();
  });

  test("Show logout to user logged in", () => {
    renderer(<NavDrawer isOpen={true} onClose={() => {}} />, {
      auth: { userId: 99 },
    });

    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.queryByText("Register")).not.toBeInTheDocument();
    expect(screen.queryByText("Log Out")).toBeInTheDocument();
  });

  test("Can logout", () => {
    renderer(<NavDrawer isOpen={true} onClose={() => {}} />, {
      auth: { userId: 99 },
    });

    userEvent.click(screen.getByText("Log Out"));
    
    expect(screen.queryByText("Login")).toBeInTheDocument();
    expect(screen.queryByText("Register")).toBeInTheDocument();
    expect(screen.queryByText("Log Out")).not.toBeInTheDocument();
  });
});
