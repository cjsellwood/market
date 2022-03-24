import { randomProducts, renderer } from "./helpers";
import EditProduct from "../components/Pages/EditProduct";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const originalFetch = window.fetch;

let mockResponse = { id: "29" };
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: () => mockResponse,
    useNavigate: () => mockNavigate,
  };
});

describe("Edit Product Component", () => {
  beforeEach(() => {
    window.fetch = originalFetch;
  });

  test("Can't access edit page if not author of product", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });

    renderer(<EditProduct />);

    expect(
      await screen.findByText("That is not your product")
    ).toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith("/products/29", {
      replace: true,
    });
  });

  test("Initial values for product are filled in", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });

    renderer(<EditProduct />, { auth: { userId: randomProducts[0].user_id } });

    expect(mockNavigate).not.toHaveBeenCalled();

    await screen.findByDisplayValue("Ergonomic Frozen Towels");

    expect(screen.getByLabelText("Title *")).toHaveValue(
      "Ergonomic Frozen Towels"
    );
    expect(screen.getByLabelText("Category *")).toHaveValue("1");
    expect(screen.getByLabelText("Description *")).toHaveValue(
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals"
    );
    expect(screen.getByLabelText("Price *")).toHaveValue(946);
    expect(screen.getByLabelText("Location *")).toHaveValue("Funkville");

    expect(screen.getByAltText("Image 1")).toHaveAttribute(
      "src",
      "https://placeimg.com/500/500/tech"
    );
  });

  test("Can edit form", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });

    renderer(<EditProduct />, { auth: { userId: randomProducts[0].user_id } });

    expect(mockNavigate).not.toHaveBeenCalled();

    await screen.findByDisplayValue("Ergonomic Frozen Towels");

    userEvent.clear(screen.getByLabelText("Title *"));
    userEvent.type(screen.getByLabelText("Title *"), "Updated product");
    expect(screen.getByLabelText("Title *")).toHaveValue("Updated product");

    userEvent.selectOptions(screen.getByLabelText("Category *"), "5");
    expect(screen.getByLabelText("Category *")).toHaveValue("5");

    userEvent.clear(screen.getByLabelText("Description *"));
    userEvent.type(
      screen.getByLabelText("Description *"),
      "Updated description"
    );
    expect(screen.getByLabelText("Description *")).toHaveValue(
      "Updated description"
    );

    userEvent.clear(screen.getByLabelText("Price *"));
    userEvent.type(screen.getByLabelText("Price *"), "999");
    expect(screen.getByLabelText("Price *")).toHaveValue(999);

    userEvent.clear(screen.getByLabelText("Location *"));
    userEvent.type(screen.getByLabelText("Location *"), "Melbourne");
    expect(screen.getByLabelText("Location *")).toHaveValue("Melbourne");
  });

  test("Can change images", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });
    window.URL.createObjectURL = jest.fn().mockReturnValue("blob");

    renderer(<EditProduct />, { auth: { userId: randomProducts[0].user_id } });

    expect(mockNavigate).not.toHaveBeenCalled();

    await screen.findByDisplayValue("Ergonomic Frozen Towels");

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

    // Remove an image that came from database
    userEvent.click(removeButtons[2]);
    expect(screen.queryByAltText("Image 3")).not.toBeInTheDocument();
    expect((fileInputs[2] as HTMLInputElement).files!.length).toBe(0);

    // Add to removed database image
    userEvent.upload(fileInputs[2], file1);
    expect((fileInputs[2] as HTMLInputElement).files![0]).toStrictEqual(file1);

    // Swap displayed image buttons
    expect(screen.queryByAltText("Image 2")).not.toBeVisible();
    userEvent.click(screen.getByLabelText("Image 2"));
    expect(screen.queryByAltText("Image 2")).toBeVisible();
  });

  test("Can submit form with updated values and images", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });
    window.URL.createObjectURL = jest.fn().mockReturnValue("blob");

    renderer(<EditProduct />, { auth: { userId: randomProducts[0].user_id } });

    expect(mockNavigate).not.toHaveBeenCalled();

    await screen.findByDisplayValue("Ergonomic Frozen Towels");

    userEvent.clear(screen.getByLabelText("Title *"));
    userEvent.type(screen.getByLabelText("Title *"), "Updated product");

    userEvent.selectOptions(screen.getByLabelText("Category *"), "5");

    userEvent.clear(screen.getByLabelText("Description *"));
    userEvent.type(
      screen.getByLabelText("Description *"),
      "Updated description"
    );

    userEvent.clear(screen.getByLabelText("Price *"));
    userEvent.type(screen.getByLabelText("Price *"), "999");

    userEvent.clear(screen.getByLabelText("Location *"));
    userEvent.type(screen.getByLabelText("Location *"), "Melbourne");

    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () =>
        Promise.resolve({
          product_id: 29,
        }),
    });

    // Change images 1 and 2
    const fileInputs = screen.getAllByLabelText("upload image", {
      selector: "input",
    });

    const file1 = new File(["test 1"], "image1.png", { type: "image/png" });
    const file2 = new File(["test 2"], "image2.png", { type: "image/png" });
    userEvent.upload(fileInputs[0], file1);
    userEvent.upload(fileInputs[1], file2);

    expect((fileInputs[0] as HTMLInputElement).files![0]).toStrictEqual(file1);
    expect((fileInputs[1] as HTMLInputElement).files![0]).toStrictEqual(file2);

    // Mock form data
    const formData = new FormData();
    formData.append("images", file1);
    formData.append("images", file2);
    formData.append("title", "Updated product");
    formData.append("category_id", "5");
    formData.append("description", "Updated description");
    formData.append("price", "999");
    formData.append("location", "Melbourne");
    formData.append(
      "updatedImages",
      JSON.stringify([
        "!https://placeimg.com/500/500/tech",
        "!https://placeimg.com/500/500/arch",
        "https://placeimg.com/500/500/animals",
      ])
    );

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).toHaveBeenLastCalledWith(
      "http://localhost:5000/products/29",
      { method: "PUT", mode: "cors", body: formData }
    );

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/products/29")
    );
  });

  test("Show error if wrong file format uploaded", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });
    renderer(<EditProduct />, { auth: { userId: randomProducts[0].user_id } });

    expect(mockNavigate).not.toHaveBeenCalled();

    await screen.findByDisplayValue("Ergonomic Frozen Towels");

    const fileInputs = screen.getAllByLabelText("upload image", {
      selector: "input",
    });

    const file1 = new File(["test 1"], "image1.zip", { type: "wrong/type" });
    userEvent.upload(fileInputs[0], file1);
    expect((fileInputs[0] as HTMLInputElement).files).toBeNull();
    expect(await screen.findByText("Not an image")).toBeInTheDocument();
  });

  test("Show error if no file selected", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });
    renderer(<EditProduct />, { auth: { userId: randomProducts[0].user_id } });

    expect(mockNavigate).not.toHaveBeenCalled();

    await screen.findByDisplayValue("Ergonomic Frozen Towels");

    const fileInputs = screen.getAllByLabelText("upload image", {
      selector: "input",
    });

    fireEvent.change(fileInputs[0], { target: { files: null } });

    expect(await screen.findByText("Image not selected")).toBeInTheDocument();
  });

  test("Can't submit without a title", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });
    renderer(<EditProduct />, { auth: { userId: randomProducts[0].user_id } });

    expect(mockNavigate).not.toHaveBeenCalled();

    await screen.findByDisplayValue("Ergonomic Frozen Towels");

    userEvent.clear(screen.getByLabelText("Title *"));

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Title is required")).toBeInTheDocument();
  });

  test("Can't submit with category of value 0", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });
    renderer(<EditProduct />, { auth: { userId: randomProducts[0].user_id } });

    expect(mockNavigate).not.toHaveBeenCalled();

    await screen.findByDisplayValue("Ergonomic Frozen Towels");

    fireEvent.change(screen.getByLabelText("Category *"), {
      target: {
        value: "0",
      },
    });

    userEvent.click(screen.getByText("Submit"));

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByText("A category must be selected")).toBeInTheDocument();
  });

  test("Show error to user", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });

    renderer(<EditProduct />, { auth: { userId: randomProducts[0].user_id } });

    expect(mockNavigate).not.toHaveBeenCalled();

    await screen.findByDisplayValue("Ergonomic Frozen Towels");

    userEvent.clear(screen.getByLabelText("Title *"));
    userEvent.type(screen.getByLabelText("Title *"), "Updated product");

    userEvent.selectOptions(screen.getByLabelText("Category *"), "5");

    userEvent.clear(screen.getByLabelText("Description *"));
    userEvent.type(
      screen.getByLabelText("Description *"),
      "Updated description"
    );

    userEvent.clear(screen.getByLabelText("Price *"));
    userEvent.type(screen.getByLabelText("Price *"), "999");

    userEvent.clear(screen.getByLabelText("Location *"));
    userEvent.type(screen.getByLabelText("Location *"), "Melbourne");

    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      json: () => Promise.resolve({ error: "Connection error" }),
    });
    userEvent.click(screen.getByText("Submit"));

    expect(await screen.findByText("Connection error")).toBeInTheDocument();
  });
});
