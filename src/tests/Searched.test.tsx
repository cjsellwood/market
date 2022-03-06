import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Searched from "../components/Pages/Searched";
import {
  renderer,
  searchCategory,
  searchProducts,
  searchProducts2,
} from "./helpers";

const originalFetch = window.fetch;

let mockResponse = {
  get: (term: string): null | string => null,
};
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useSearchParams: () => {
      return [mockResponse];
    },
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

  test("Searching within a category", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(searchCategory),
    });

    mockResponse = {
      get: (term) => {
        if (term === "q") {
          return "the";
        } else {
          return "1";
        }
      },
    };

    renderer(<Searched />);

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/search?q=the&page=1&category=1",
      {
        method: "GET",
        mode: "cors",
      }
    );

    expect(await screen.findByText("Awesome Concrete Hat")).toBeInTheDocument();
  });

  test("Shows 2nd page of results with a category", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(searchProducts),
    });

    mockResponse = {
      get: (term) => {
        if (term === "q") {
          return "the";
        } else if (term === "page") {
          return "1";
        } else if (term === "category") {
          return "1";
        } else {
          return null;
        }
      },
    };

    renderer(<Searched />);

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/search?q=the&page=1&category=1",
      {
        method: "GET",
        mode: "cors",
      }
    );

    expect(await screen.findByText("Sleek Plastic Chips")).toBeInTheDocument();

    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(searchProducts2),
    });
    window.scrollTo = jest.fn();
    mockResponse = {
      get: (term) => {
        if (term === "q") {
          return "the";
        } else if (term === "page") {
          return "2";
        } else if (term === "category") {
          return "1";
        } else {
          return null;
        }
      },
    };

    renderer(<Searched />, {
      product: {
        count: searchProducts.count,
        products: searchProducts.products,
      },
    });

    userEvent.click(screen.getByText(">"));

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/search?q=the&page=2&count=38&category=1",
      {
        method: "GET",
        mode: "cors",
      }
    );

    expect(
      await screen.findByText("Licensed Granite Cheese")
    ).toBeInTheDocument();
  });
});
