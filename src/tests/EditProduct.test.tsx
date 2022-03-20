import { randomProducts, renderer } from "./helpers";
import EditProduct from "../components/Pages/EditProduct";
import { screen } from "@testing-library/react";

const originalFetch = window.fetch;

let mockResponse = { id: "29" };
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: () => mockResponse,
  };
});

describe("New Product Component", () => {
  beforeEach(() => {
    window.fetch = originalFetch;
  });

  test("Initial values for product are filled in", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });

    renderer(<EditProduct />);

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
  });
});
