import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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
    renderer(<NewProduct />, { auth: { token: "2f4dfd" } });

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

    // Image upload
    window.URL.createObjectURL = jest.fn().mockReturnValue("blob");
    const fileInputs = screen.getAllByLabelText("upload image", {
      selector: "input",
    });
    const file1 = new File(["test 1"], "image1.png", { type: "image/png" });
    userEvent.upload(fileInputs[0], file1);

    userEvent.click(screen.getByText("Submit"));
    waitForElementToBeRemoved(() => screen.getByText("Submit"));

    const formData = new FormData();
    formData.append("images", file1);
    formData.append("title", "New Product");
    formData.append("category_id", "1");
    formData.append("description", "product description");
    formData.append("price", "999");
    formData.append("location", "Melbourne");

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/new",
      {
        method: "POST",
        mode: "cors",
        body: formData,
        headers: {
          Authorization: "Bearer 2f4dfd",
        },
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

  test("Adding image upload", () => {
    window.URL.createObjectURL = jest.fn().mockReturnValue("blob");
    renderer(<NewProduct />);

    expect(screen.queryByAltText("Image 1")).not.toBeInTheDocument();

    const fileInputs = screen.getAllByLabelText("upload image", {
      selector: "input",
    });

    const file1 = new File(["test 1"], "image1.png", { type: "image/png" });
    const file2 = new File(["test 2"], "image2.png", { type: "image/png" });
    userEvent.upload(fileInputs[0], file1);
    userEvent.upload(fileInputs[1], file2);

    expect((fileInputs[0] as HTMLInputElement).files![0]).toStrictEqual(file1);
    expect((fileInputs[1] as HTMLInputElement).files![0]).toStrictEqual(file2);

    expect(screen.queryByAltText("Image 1")).toBeInTheDocument();
    expect(screen.getByAltText("Image 1")).toHaveAttribute("src", "blob");
    expect(screen.getByAltText("Image 2")).toHaveAttribute("src", "blob");

    // Remove image
    const removeButtons = screen.getAllByLabelText("remove image");
    userEvent.click(removeButtons[0]);
    expect(screen.queryByAltText("Image 1")).not.toBeInTheDocument();
    expect((fileInputs[0] as HTMLInputElement).files).toBeNull();

    // Swap displayed image buttons
    expect(screen.queryByAltText("Image 2")).not.toBeVisible();
    userEvent.click(screen.getByLabelText("Image 2"));
    expect(screen.queryByAltText("Image 2")).toBeVisible();
  });

  test("Show error if wrong file format uploaded", async () => {
    renderer(<NewProduct />);

    const fileInputs = screen.getAllByLabelText("upload image", {
      selector: "input",
    });

    const file1 = new File(["test 1"], "image1.zip", { type: "wrong/type" });
    userEvent.upload(fileInputs[0], file1);
    expect((fileInputs[0] as HTMLInputElement).files).toBeNull();
    expect(await screen.findByText("Not an image")).toBeInTheDocument();
  });

  test("Show error if no file selected", async () => {
    renderer(<NewProduct />);

    const fileInputs = screen.getAllByLabelText("upload image", {
      selector: "input",
    });

    fireEvent.change(fileInputs[0], { target: { files: null } });

    expect(await screen.findByText("Image not selected")).toBeInTheDocument();
  });
});
