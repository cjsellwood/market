import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { randomProducts, renderer } from "./helpers";
import Product from "../components/Pages/Product";
import userEvent from "@testing-library/user-event";

let mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
      id: "29",
    }),
    useNavigate: () => mockNavigate,
  };
});

const originalFetch = window.fetch;
describe("Product component", () => {
  beforeEach(async () => {
    window.fetch = originalFetch;
  });

  it("Display a single product", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });

    renderer(<Product />);

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/29",
      {
        method: "GET",
        mode: "cors",
      }
    );

    expect(
      await screen.findByText("Ergonomic Frozen Towels")
    ).toBeInTheDocument();
    expect(screen.queryByText(/Andy shoes are designed/)).toBeInTheDocument();
    expect(screen.queryByText("$946")).toBeInTheDocument();
    expect(screen.queryByText("Cars", { selector: "a" })).toBeInTheDocument();
    expect(screen.queryAllByText(/2022/).length).not.toEqual(0);
    expect(screen.queryAllByText(/Funkville/).length).not.toEqual(0);
  });

  it("Can change show product images", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });

    renderer(<Product />);

    expect(
      await screen.findByText("Ergonomic Frozen Towels")
    ).toBeInTheDocument();

    expect(screen.queryByAltText("Ergonomic Frozen Towels 1")).toBeVisible();
    expect(
      screen.queryByAltText("Ergonomic Frozen Towels 2")
    ).not.toBeVisible();

    userEvent.click(screen.getByLabelText("Image 2"));

    expect(
      screen.queryByAltText("Ergonomic Frozen Towels 1")
    ).not.toBeVisible();
    expect(screen.queryByAltText("Ergonomic Frozen Towels 2")).toBeVisible();
  });

  it("Show not found if trying to access product that does not exist", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 404,
      json: () => Promise.resolve({ error: "Product not found" }),
    });

    renderer(<Product />);

    expect(await screen.findByText("Product not found")).toBeInTheDocument();
  });

  it("Can delete the product", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });

    renderer(<Product />);

    expect(
      await screen.findByText("Ergonomic Frozen Towels")
    ).toBeInTheDocument();

    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => {},
    });
    userEvent.click(screen.getByText("Delete"));

    expect(window.fetch).toHaveBeenLastCalledWith(
      "http://localhost:5000/products/29",
      { method: "DELETE", mode: "cors" }
    );

    await waitForElementToBeRemoved(() =>
      screen.queryByText("Ergonomic Frozen Towels")
    );

    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });

  it("Shows error if can't delete", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });

    renderer(<Product />);

    expect(
      await screen.findByText("Ergonomic Frozen Towels")
    ).toBeInTheDocument();

    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      json: () => ({
        error: "Deletion error",
      }),
    });
    userEvent.click(screen.getByText("Delete"));

    expect(window.fetch).toHaveBeenCalled();

    expect(screen.queryByText("Delete")).toBeInTheDocument();

    expect(await screen.findByText("Deletion error")).toBeInTheDocument();
  });
});
