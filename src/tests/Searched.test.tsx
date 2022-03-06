import { screen } from "@testing-library/react";
import Searched from "../components/Pages/Searched";
import { renderer, searchProducts } from "./helpers";

const originalFetch = window.fetch;

let mockResponse = {
  get: (): null | string => null,
};
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useSearchParams: () => [mockResponse],
  };
});

describe("Searched Component tests", () => {
  beforeEach(() => {
    window.fetch = originalFetch;
  });

  test("If no search query display help text", async () => {
    window.fetch = jest.fn();

    renderer(<Searched />);

    expect(window.fetch).not.toHaveBeenCalled();

    expect(await screen.findByText("Search for a product")).toBeInTheDocument();

    expect(screen.queryByText("1")).not.toBeInTheDocument();

    expect(screen.queryByText("No results")).not.toBeInTheDocument();
  });

  test("It shows results", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(searchProducts),
    });

    mockResponse = {
      get: () => "the",
    };

    renderer(<Searched />);

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/search?q=the&page=1",
      {
        method: "GET",
        mode: "cors",
      }
    );

    expect(await screen.findByText("Sleek Plastic Chips")).toBeInTheDocument();
  });

  test("Shows error if can't connect", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      json: () => Promise.resolve({ error: "Connection error" }),
    });

    renderer(<Searched />);

    expect(await screen.findByText("Connection error")).toBeInTheDocument();
  });

  test("Tells user if no results", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve({ products: [], count: "0" }),
    });

    renderer(<Searched />);

    expect(await screen.findByText("No results")).toBeInTheDocument();
  });
});
