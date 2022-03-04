import { screen } from "@testing-library/react";
import { allProducts, renderer, searchCategory } from "./helpers";
import Products from "../components/Products";
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

    renderer(<Products />);

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products?page=1",
      {
        method: "GET",
        mode: "cors",
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

  test("Show error if can't return products", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
    });

    renderer(<Products />);

    expect(await screen.findByText("Connection error")).toBeInTheDocument();
  });

  test("Switching to 2nd page", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(allProducts),
    });
    window.scrollTo = jest.fn();

    renderer(<Products />);

    expect(await screen.findByText("Refined Cotton Ball")).toBeInTheDocument();

    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () =>
        Promise.resolve({ products: searchCategory.products, count: "50" }),
    });

    userEvent.click(screen.getByLabelText("Page 2"));

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products?page=2",
      {
        method: "GET",
        mode: "cors",
      }
    );

    expect(
      await screen.findByText("Licensed Concrete Fish")
    ).toBeInTheDocument();
  });
});
