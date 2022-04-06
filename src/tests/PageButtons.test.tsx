import { screen } from "@testing-library/react";
import PageButtons from "../components/Navigation/PageButtons";
import { renderer } from "./helpers";
import userEvent from "@testing-library/user-event";

let mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const originalFetch = window.fetch;
describe("Products component", () => {
  beforeEach(async () => {
    window.fetch = originalFetch;
  });

  test("When count is 0 show no buttons", () => {
    renderer(<PageButtons count="0" page={1} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).not.toBeInTheDocument();
    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.queryByText(">")).not.toBeInTheDocument();
  });

  test("When count is less than what would make products appear", () => {
    renderer(<PageButtons count="4" page={2} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).not.toBeInTheDocument();
    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.queryByText(">")).not.toBeInTheDocument();
  });

  test("On page 1 with count 10 should be (1)", () => {
    renderer(<PageButtons count="10" page={1} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).not.toBeInTheDocument();
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText(">")).not.toBeInTheDocument();
    expect(screen.queryByText("1")).toHaveStyle("borderColor: #e5067d");
  });

  test("On page 1 with count 50 should be (1) 2 3 >", () => {
    renderer(<PageButtons count="50" page={1} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).not.toBeInTheDocument();
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).toBeInTheDocument();
    expect(screen.queryByText("3")).toBeInTheDocument();
    expect(screen.queryByText(">")).toBeInTheDocument();
    expect(screen.queryByText("1")).toHaveStyle("borderColor: #e5067d");
  });

  test("On page 2 with count 50 should be < 1 (2) 3 >", () => {
    renderer(<PageButtons count="50" page={2} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).toBeInTheDocument();
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).toBeInTheDocument();
    expect(screen.queryByText("3")).toBeInTheDocument();
    expect(screen.queryByText(">")).toBeInTheDocument();
    expect(screen.queryByText("2")).toHaveStyle("borderColor: #e5067d");
  });

  test("On page 3 with count 50 should be < 1 2 (3)", () => {
    renderer(<PageButtons count="50" page={3} urlPrefix={"products"} />);

    expect(screen.queryByText("<")).toBeInTheDocument();
    expect(screen.queryByText("1")).toBeInTheDocument();
    expect(screen.queryByText("2")).toBeInTheDocument();
    expect(screen.queryByText("3")).toBeInTheDocument();
    expect(screen.queryByText(">")).not.toBeInTheDocument();
    expect(screen.queryByText("3")).toHaveStyle("borderColor: #e5067d");
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
    expect(screen.queryByText("1")).toHaveStyle("borderColor: #e5067d");
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
    expect(screen.queryByText("2")).toHaveStyle("borderColor: #e5067d");
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
    expect(screen.queryByText("3")).toHaveStyle("borderColor: #e5067d");
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
    expect(screen.queryByText("4")).toHaveStyle("borderColor: #e5067d");
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
    expect(screen.queryByText("8")).toHaveStyle("borderColor: #e5067d");
  });

  test("Clicking on previous page button", () => {
    renderer(<PageButtons count="150" page={4} urlPrefix={"products"} />);

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("<"));
    expect(window.scrollTo).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/products?page=3");
  });

  test("Clicking on next page button", () => {
    renderer(<PageButtons count="150" page={4} urlPrefix={"products"} />);

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText(">"));
    expect(window.scrollTo).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/products?page=5");
  });

  test("Clicking on a page button", () => {
    renderer(<PageButtons count="150" page={4} urlPrefix={"products"} />);

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("5"));
    expect(window.scrollTo).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/products?page=5");
  });

  test("Clicking on current page button", () => {
    renderer(<PageButtons count="150" page={4} urlPrefix={"products"} />);

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("4"));
    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });

  test("Clicking previous button on page 2", () => {
    renderer(<PageButtons count="150" page={2} urlPrefix={"products"} />);

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("<"));
    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });

  test("Clicking on a page button with a query", () => {
    renderer(
      <PageButtons count="150" page={2} urlPrefix={"search"} query={"the"} />
    );

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("3"));
    expect(mockNavigate).toHaveBeenCalledWith("/search?page=3&q=the");
  });

  test("Clicking on page 1 button with a query", () => {
    renderer(
      <PageButtons count="150" page={2} urlPrefix={"search"} query={"the"} />
    );

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("1"));
    expect(mockNavigate).toHaveBeenCalledWith("/search?q=the");
  });

  test("Clicking on previous page button with a query", () => {
    renderer(
      <PageButtons count="150" page={2} urlPrefix={"search"} query={"the"} />
    );

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("<"));
    expect(mockNavigate).toHaveBeenCalledWith("/search?q=the");
  });

  test("Clicking on previous page button with a query and category", () => {
    renderer(
      <PageButtons
        count="150"
        page={2}
        urlPrefix={"search"}
        query={"the"}
        category={"1"}
      />
    );

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("<"));
    expect(mockNavigate).toHaveBeenCalledWith("/search?q=the&category=1");
  });

  test("Clicking on previous page button on page 4 with query", () => {
    renderer(
      <PageButtons count="150" page={4} urlPrefix={"search"} query={"the"} />
    );

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("<"));
    expect(mockNavigate).toHaveBeenCalledWith("/search?page=3&q=the");
  });

  test("Clicking on previous page button on page 4 with query and category", () => {
    renderer(
      <PageButtons
        count="150"
        page={4}
        urlPrefix={"search"}
        query={"the"}
        category={"1"}
      />
    );

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("<"));
    expect(mockNavigate).toHaveBeenCalledWith(
      "/search?page=3&q=the&category=1"
    );
  });

  test("Clicking on a page button with a query and category", () => {
    renderer(
      <PageButtons
        count="150"
        page={2}
        urlPrefix={"search"}
        query={"the"}
        category={"1"}
      />
    );

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("3"));
    expect(mockNavigate).toHaveBeenCalledWith(
      "/search?page=3&q=the&category=1"
    );
  });

  test("Clicking on page 1 button with a query and category", () => {
    renderer(
      <PageButtons
        count="150"
        page={2}
        urlPrefix={"search"}
        query={"the"}
        category={"1"}
      />
    );

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText("1"));
    expect(mockNavigate).toHaveBeenCalledWith("/search?q=the&category=1");
  });

  test("Clicking on next page button with a query and category", () => {
    renderer(
      <PageButtons
        count="150"
        page={2}
        urlPrefix={"search"}
        query={"the"}
        category={"1"}
      />
    );

    window.scrollTo = jest.fn();
    userEvent.click(screen.getByText(">"));
    expect(mockNavigate).toHaveBeenCalledWith(
      "/search?page=3&q=the&category=1"
    );
  });
});
