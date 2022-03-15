import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewProduct from "../components/Pages/NewProduct";
import { renderer } from "./helpers";

const originalFetch = window.fetch;

describe("New Product Component", () => {
  beforeEach(() => {
    window.fetch = originalFetch;
  });

  test("Can fill in form", () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () =>
        Promise.resolve({
          product_id: 99,
        }),
    });
    renderer(<NewProduct />);

    userEvent.type(screen.getByLabelText("Title *"), "New Product");
    expect(screen.getByLabelText("Title *")).toHaveValue("New Product");

    userEvent.selectOptions(screen.getByLabelText("Category *"), "1");
    expect(screen.getByLabelText("Category *")).toHaveValue("1");

    userEvent.type(
      screen.getByLabelText("Description *"),
      "product description"
    );
    expect(screen.getByLabelText("Description *")).toHaveValue(
      "product description"
    );

    userEvent.type(screen.getByLabelText("Price *"), "999");
    expect(screen.getByLabelText("Price *")).toHaveValue(999);

    userEvent.type(screen.getByLabelText("Location *"), "Melbourne");
    expect(screen.getByLabelText("Location *")).toHaveValue("Melbourne");

    userEvent.click(screen.getByText("Submit"));
    waitForElementToBeRemoved(() => screen.getByText("Submit"));

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/new",
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          title: "New Product",
          category_id: "1",
          description: "product description",
          price: "999",
          location: "Melbourne",
        }),
      }
    );
  });

  test("Can't submit without a title", () => {
    window.fetch = jest.fn();
    renderer(<NewProduct />);

    userEvent.selectOptions(screen.getByLabelText("Category *"), "1");
    expect(screen.getByLabelText("Category *")).toHaveValue("1");

    userEvent.type(
      screen.getByLabelText("Description *"),
      "product description"
    );
    expect(screen.getByLabelText("Description *")).toHaveValue(
      "product description"
    );

    userEvent.type(screen.getByLabelText("Price *"), "999");
    expect(screen.getByLabelText("Price *")).toHaveValue(999);

    userEvent.type(screen.getByLabelText("Location *"), "Melbourne");
    expect(screen.getByLabelText("Location *")).toHaveValue("Melbourne");

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).not.toHaveBeenCalled();
    expect(screen.getByText("Title is required")).toBeInTheDocument();
  });

  test("Can't submit without choosing a category", () => {
    window.fetch = jest.fn();
    renderer(<NewProduct />);

    userEvent.type(screen.getByLabelText("Title *"), "New Product");
    expect(screen.getByLabelText("Title *")).toHaveValue("New Product");

    userEvent.type(
      screen.getByLabelText("Description *"),
      "product description"
    );
    expect(screen.getByLabelText("Description *")).toHaveValue(
      "product description"
    );

    userEvent.type(screen.getByLabelText("Price *"), "999");
    expect(screen.getByLabelText("Price *")).toHaveValue(999);

    userEvent.type(screen.getByLabelText("Location *"), "Melbourne");
    expect(screen.getByLabelText("Location *")).toHaveValue("Melbourne");

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).not.toHaveBeenCalled();
    expect(screen.getByText("A category must be selected")).toBeInTheDocument();
  });

  test("Show error to user", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      json: () => Promise.resolve({ error: "Connection error" }),
    });

    renderer(<NewProduct />);

    userEvent.type(screen.getByLabelText("Title *"), "New Product");
    userEvent.selectOptions(screen.getByLabelText("Category *"), "1");
    userEvent.type(
      screen.getByLabelText("Description *"),
      "product description"
    );
    userEvent.type(screen.getByLabelText("Price *"), "999");
    userEvent.type(screen.getByLabelText("Location *"), "Melbourne");

    userEvent.click(screen.getByText("Submit"));

    expect(await screen.findByText("Connection error")).toBeInTheDocument();
  });
});
