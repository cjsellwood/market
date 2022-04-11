import userEvent from "@testing-library/user-event";
import NavBar from "../components/Navigation/NavBar";
import { renderer } from "./helpers";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";

const mockToggleColorMode = jest.fn();
jest.mock("@chakra-ui/react", () => {
  return {
    ...jest.requireActual("@chakra-ui/react"),
    useColorMode: () => {
      return { toggleColorMode: mockToggleColorMode, colorMode: "light" };
    },
  };
});
describe("Navbar testing", () => {
  beforeEach(() => {
    renderer(<NavBar />);
  });
  test("Should open navbar on hamburger click and close with button", async () => {
    userEvent.click(screen.getByLabelText("open menu"));

    expect(screen.getByText("Login")).toBeInTheDocument();

    userEvent.click(screen.getByLabelText("close menu"));

    await waitForElementToBeRemoved(() => screen.getByLabelText("close menu"));

    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });

  test("Changing theme when in desktop mode", () => {
    renderer(<NavBar />);

    expect(screen.getAllByTestId("moon").length).toBe(2);
    userEvent.click(screen.getAllByLabelText("toggle theme")[0]);
    expect(mockToggleColorMode).toHaveBeenCalled();
  });
});
