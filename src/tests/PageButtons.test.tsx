import { screen } from "@testing-library/react";
import PageButtons from "../components/Navigation/PageButtons";
import { renderer } from "./helpers";
import userEvent from "@testing-library/user-event";

const originalFetch = window.fetch;
describe("Products component", () => {
  beforeEach(async () => {
    window.fetch = originalFetch;
  });

  test("On page 1 with count 10 should be (1)", () => {
    renderer(<PageButtons count="1" page={1} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).not.toBeInTheDocument();
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText(">")).not.toBeInTheDocument();
    expect(screen.queryByText("1")).toHaveStyle("outline: 2px solid red");
  });

  test("On page 1 with count 50 should be (1) 2 3 >", () => {
    renderer(<PageButtons count="50" page={1} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).not.toBeInTheDocument();
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).toBeInTheDocument();
    expect(screen.queryByText("3")).toBeInTheDocument();
    expect(screen.queryByText(">")).toBeInTheDocument();
    expect(screen.queryByText("1")).toHaveStyle("outline: 2px solid red");
  });

  test("On page 2 with count 50 should be < 1 (2) 3 >", () => {
    renderer(<PageButtons count="50" page={2} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).toBeInTheDocument();
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).toBeInTheDocument();
    expect(screen.queryByText("3")).toBeInTheDocument();
    expect(screen.queryByText(">")).toBeInTheDocument();
    expect(screen.queryByText("2")).toHaveStyle("outline: 2px solid red");
  });

  test("On page 3 with count 50 should be < 1 2 (3)", () => {
    renderer(<PageButtons count="50" page={3} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).toBeInTheDocument();
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).toBeInTheDocument();
    expect(screen.queryByText("3")).toBeInTheDocument();
    expect(screen.queryByText(">")).not.toBeInTheDocument();
    expect(screen.queryByText("3")).toHaveStyle("outline: 2px solid red");
  });

  test("On page 1 with count 150 should be (1) 2 3 4 5 >", () => {
    renderer(<PageButtons count="150" page={1} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).not.toBeInTheDocument();
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).toBeInTheDocument();
    expect(screen.queryByText("3")).toBeInTheDocument();
    expect(screen.queryByText("4")).toBeInTheDocument();
    expect(screen.queryByText("5")).toBeInTheDocument();
    expect(screen.queryByText(">")).toBeInTheDocument();
    expect(screen.queryByText("1")).toHaveStyle("outline: 2px solid red");
  });

  test("On page 2 with count 150 should be < 1 (2) 3 4 5 >", () => {
    renderer(<PageButtons count="150" page={2} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).toBeInTheDocument();
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).toBeInTheDocument();
    expect(screen.queryByText("3")).toBeInTheDocument();
    expect(screen.queryByText("4")).toBeInTheDocument();
    expect(screen.queryByText("5")).toBeInTheDocument();
    expect(screen.queryByText(">")).toBeInTheDocument();
    expect(screen.queryByText("2")).toHaveStyle("outline: 2px solid red");
  });

  test("On page 3 with count 150 should be < 1 2 (3) 4 5 >", () => {
    renderer(<PageButtons count="150" page={3} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).toBeInTheDocument();
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).toBeInTheDocument();
    expect(screen.queryByText("3")).toBeInTheDocument();
    expect(screen.queryByText("4")).toBeInTheDocument();
    expect(screen.queryByText("5")).toBeInTheDocument();
    expect(screen.queryByText(">")).toBeInTheDocument();
    expect(screen.queryByText("3")).toHaveStyle("outline: 2px solid red");
  });

  test("On page 4 with count 150 should be < 2 3 (4) 5 6 >", () => {
    renderer(<PageButtons count="150" page={4} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).toBeInTheDocument();
    expect(screen.queryByText("2")).toBeInTheDocument();
    expect(screen.queryByText("3")).toBeInTheDocument();
    expect(screen.queryByText("4")).toBeInTheDocument();
    expect(screen.queryByText("5")).toBeInTheDocument();
    expect(screen.queryByText("6")).toBeInTheDocument();
    expect(screen.queryByText(">")).toBeInTheDocument();
    expect(screen.queryByText("4")).toHaveStyle("outline: 2px solid red");
  });

  test("On page 8 with count 150 should be < 4 5 6 7 (8) ", () => {
    renderer(<PageButtons count="150" page={8} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).toBeInTheDocument();
    expect(screen.queryByText("4")).toBeInTheDocument();
    expect(screen.queryByText("5")).toBeInTheDocument();
    expect(screen.queryByText("6")).toBeInTheDocument();
    expect(screen.queryByText("7")).toBeInTheDocument();
    expect(screen.queryByText("8")).toBeInTheDocument();
    expect(screen.queryByText(">")).not.toBeInTheDocument();
    expect(screen.queryByText("8")).toHaveStyle("outline: 2px solid red");
  });

  test("On click, navigates to a different page", () => {
    renderer(<PageButtons count="150" page={4} urlPrefix={"products"} />);

    // Clicking on page 5 button
    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("5"));
    expect(window.scrollTo).toHaveBeenCalled();

    // Clicking on current page button
    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("4"));
    expect(window.scrollTo).not.toHaveBeenCalled();

    // Clicking on previous page button
    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("<"));
    expect(window.scrollTo).toHaveBeenCalled();

    // Clicking on next page button
    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText(">"));
    expect(window.scrollTo).toHaveBeenCalled();
  });

  test("Clicking previous button on page 2", () => {
    renderer(<PageButtons count="150" page={2} urlPrefix={"products"} />);

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("<"));
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
