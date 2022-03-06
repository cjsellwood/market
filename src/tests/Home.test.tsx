import { screen } from "@testing-library/react";
import Home from "../components/Pages/Home";
import { randomProducts, renderer } from "./helpers";

const originalFetch = window.fetch;
describe("Home component", () => {
  beforeEach(async () => {
    window.fetch = originalFetch;
  });

  it("Display home screen content", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts),
    });

    renderer(<Home />);

    expect(
      await screen.findByText("Ergonomic Frozen Towels")
    ).toBeInTheDocument();

    expect(screen.queryByText(/Andy shoes are designed/)).toBeInTheDocument();

    expect(screen.queryByText("$946")).toBeInTheDocument();
    expect(screen.queryAllByText(/2022/).length).not.toEqual(0);
    expect(screen.queryAllByText(/Funkville/).length).not.toEqual(0);

    expect(screen.queryByText("Fantastic Frozen Bike")).toBeInTheDocument();
  });
});
