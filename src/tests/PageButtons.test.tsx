import { screen } from "@testing-library/react";
import PageButtons from "../components/Navigation/PageButtons";
import { renderer } from "./helpers";
import userEvent from "@testing-library/user-event";

const originalFetch = window.fetch;
describe("Products component", () => {
  beforeEach(async () => {
    window.fetch = originalFetch;
  });

  test("Renders page buttons", () => {
    const container = renderer(<PageButtons count="50" page={1} />);

    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
