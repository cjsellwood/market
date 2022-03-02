import { screen } from "@testing-library/react";
import { randomProducts, renderer } from "./helpers";
import Product from "../components/Product";

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
      id: "29",
    }),
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
    expect(screen.queryByText("Cars")).toBeInTheDocument();
    expect(screen.queryAllByText(/2022/).length).not.toEqual(0);
    expect(screen.queryAllByText(/Funkville/).length).not.toEqual(0);
  });
});
