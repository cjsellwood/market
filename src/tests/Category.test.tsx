import { screen } from "@testing-library/react";
import Category from "../components/Pages/Category";
import { category1Products, renderer, searchCategory } from "./helpers";

const originalFetch = window.fetch;

let mockResponse = { category: "cars" };
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: () => mockResponse,
  };
});

describe("Category page tests", () => {
  beforeEach(() => {
    window.fetch = originalFetch;
  });

  test("It loads products of category 1", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(category1Products),
    });

    renderer(<Category />);

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/category/1?page=1",
      {
        method: "GET",
        mode: "cors",
      }
    );

    expect(
      await screen.findByText("Handcrafted Wooden Fish")
    ).toBeInTheDocument();
  });

  test("It loads products of category 5", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(searchCategory),
    });

    mockResponse = { category: "foodanddrink" };

    renderer(<Category />);

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/category/5?page=1",
      {
        method: "GET",
        mode: "cors",
      }
    );

    expect(
      await screen.findByText("Licensed Concrete Fish")
    ).toBeInTheDocument();
  });

  test("Show error in toast", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      json: () => Promise.resolve({ error: "Connection error" }),
    });

    renderer(<Category />);

    expect(await screen.findByText("Connection error")).toBeInTheDocument();
  });
});
