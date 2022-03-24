import { screen } from "@testing-library/react";
import RedirectLogin from "../components/Navigation/RedirectLogin";
import { renderer } from "./helpers";

let mockNavigate = jest.fn();
let mockLocation = {
  pathname: "/new",
  search: "",
  hash: "",
  state: null,
  key: "default",
};
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

describe("Redirect Login component", () => {
  test("Redirect to login for users not logged in", () => {
    renderer(
      <RedirectLogin>
        <p>Content</p>
      </RedirectLogin>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login", {
      replace: true,
      state: { from: mockLocation },
    });
  });

  test("Show content to logged in user", () => {
    renderer(
      <RedirectLogin>
        <p>Content</p>
      </RedirectLogin>,
      { auth: { userId: 99 } }
    );

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(screen.queryByText("Content")).toBeInTheDocument();
  });
});
