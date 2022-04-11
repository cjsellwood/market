import { screen } from "@testing-library/react";
import { allProducts, renderer, searchCategory } from "./helpers";
import UserProducts from "../components/Pages/UserProducts";
import userEvent from "@testing-library/user-event";

const originalFetch = window.fetch;
describe("Products component", () => {
  beforeEach(async () => {
    window.fetch = originalFetch;
  });

  test("Display 20 products on first page", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(allProducts),
    });

    renderer(<UserProducts />, { auth: { token: "2f4dfd" } });

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/user?page=1",
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer 2f4dfd",
        },
      }
    );

    expect(await screen.findByText("Refined Cotton Ball")).toBeInTheDocument();
    expect(
      screen.queryByText(/New range of formal shirts/)
    ).toBeInTheDocument();
    expect(screen.queryByText("$609")).toBeInTheDocument();
    expect(screen.queryAllByText(/2022/).length).not.toEqual(0);
    expect(screen.queryAllByText(/Tryciastad/).length).not.toEqual(0);
    expect(screen.queryByAltText("Refined Cotton Ball")).toHaveAttribute(
      "src",
      "https://placeimg.com/500/500/tech"
    );
  });

  test("Tells user if no results", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve({ products: [], count: "0" }),
    });

    renderer(<UserProducts />);

    expect(await screen.findByText("No results")).toBeInTheDocument();
  });

  test("Show error if can't return products", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
    });

    renderer(<UserProducts />, { auth: { token: "2f4dfd" } });

    expect(await screen.findByText("Connection error")).toBeInTheDocument();
  });

  test("Switching to 2nd page with Page 2 button", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(allProducts),
    });
    window.scrollTo = jest.fn();

    renderer(<UserProducts />, { auth: { token: "2f4dfd" } });

    expect(await screen.findByText("Refined Cotton Ball")).toBeInTheDocument();

    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () =>
        Promise.resolve({ products: searchCategory.products, count: "50" }),
    });

    userEvent.click(screen.getByLabelText("Page 2"));

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/user?page=2&count=50",
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer 2f4dfd",
        },
      }
    );
    expect(window.scrollTo).toHaveBeenCalled();

    expect(
      await screen.findByText("Licensed Concrete Fish")
    ).toBeInTheDocument();
  });

  test("Switching between pages with Next Page and Previous Page buttons", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(allProducts),
    });
    window.scrollTo = jest.fn();

    renderer(<UserProducts />, { auth: { token: "2f4dfd" } });

    expect(await screen.findByText("Refined Cotton Ball")).toBeInTheDocument();

    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () =>
        Promise.resolve({ products: searchCategory.products, count: "50" }),
    });

    // Navigate to page 2
    userEvent.click(screen.getByLabelText("Page 2"));

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/user?page=2&count=50",
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "Bearer 2f4dfd",
        },
      }
    );
    expect(window.scrollTo).toHaveBeenCalled();

    expect(
      await screen.findByText("Licensed Concrete Fish")
    ).toBeInTheDocument();

    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(allProducts),
    });

    // Navigate back to page 1
    userEvent.click(screen.getByLabelText("Page 1"));

    expect(await screen.findByText("Refined Cotton Ball")).toBeInTheDocument();

    expect(window.scrollTo).toHaveBeenCalled();
  });
});
