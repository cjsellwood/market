import NavDrawer from "../components/Navigation/NavDrawer";
import { renderer } from "./helpers";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockToggleColorMode = jest.fn();
jest.mock("@chakra-ui/react", () => {
  return {
    ...jest.requireActual("@chakra-ui/react"),
    useColorMode: () => {
      return { toggleColorMode: mockToggleColorMode, colorMode: "light" };
    },
  };
});
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
    expect(screen.queryByText("You are now logged out")).toBeInTheDocument();
  });

  test("Change theme", () => {
    renderer(<NavDrawer isOpen={true} onClose={() => {}} />);

    expect(screen.getByTestId("moon")).toBeInTheDocument();
    userEvent.click(screen.getByLabelText("toggle theme"));
    expect(mockToggleColorMode).toHaveBeenCalled();
  });
});
