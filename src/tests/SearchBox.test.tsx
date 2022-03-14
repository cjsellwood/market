import { renderer } from "./helpers";
import SearchBox from "../components/Parts/SearchBox";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

let mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Searchbox component", () => {
  test("Renders component", () => {
    renderer(<SearchBox />);
    expect(screen.getByLabelText("search")).toBeInTheDocument();
    expect(screen.getByLabelText("submit search")).toBeInTheDocument();
    expect(
      (
        screen.getByRole("option", {
          name: "All Categories",
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);
    expect(
      (
        screen.getByRole("option", {
          name: "Cars",
        }) as HTMLOptionElement
      ).selected
    ).toBe(false);
  });

  test("Can fill in form", () => {
    renderer(<SearchBox />);

    userEvent.type(screen.getByLabelText("search"), "the");
    expect(screen.getByLabelText("search")).toHaveValue("the");

    userEvent.selectOptions(screen.getByRole("combobox"), "Cars");

    expect(
      (screen.getByRole("option", { name: "Cars" }) as HTMLOptionElement)
        .selected
    ).toBe(true);

    expect(
      (
        screen.getByRole("option", {
          name: "All Categories",
        }) as HTMLOptionElement
      ).selected
    ).toBe(false);
  });

  test("Can submit form", () => {
    renderer(<SearchBox />);

    userEvent.type(screen.getByLabelText("search"), "the");
    userEvent.selectOptions(screen.getByRole("combobox"), "Cars");

    userEvent.click(screen.getByLabelText("submit search"));

    expect(mockNavigate).toHaveBeenCalledWith("/search?q=the&category=1");
  });

  test("Can submit form with all categories", () => {
    renderer(<SearchBox />);

    userEvent.type(screen.getByLabelText("search"), "the");
    userEvent.click(screen.getByLabelText("submit search"));

    expect(mockNavigate).toHaveBeenCalledWith("/search?q=the");
  });

  test("Can not submit form if nothing typed", () => {
    renderer(<SearchBox />);

    userEvent.click(screen.getByLabelText("submit search"));

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("Renders with search initially filled in", () => {
    renderer(<SearchBox initialSearch={"t"} />);

    expect(screen.getByLabelText("search")).toHaveValue("t");
  });

  test("Renders with search initially filled in", () => {
    renderer(<SearchBox initialCategory={"1"} />);

    expect(
      (
        screen.getByRole("option", {
          name: "All Categories",
        }) as HTMLOptionElement
      ).selected
    ).toBe(false);
    expect(
      (
        screen.getByRole("option", {
          name: "Cars",
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);
  });
});
