import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import {
  messagedProduct,
  messagedProductAuthor,
  messagedProductAuthorNoMessages,
  randomProducts,
  renderer,
} from "./helpers";
import Product from "../components/Pages/Product";
import userEvent from "@testing-library/user-event";

let mockNavigate = jest.fn();
let mockLocation = {
  pathname: "/products/29",
  search: "",
  hash: "",
  state: null,
  key: "default",
};
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
      id: "29",
    }),
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
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
    expect(
      screen.queryByText("Cars and Vehicles", { selector: "a" })
    ).toBeInTheDocument();
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

    expect(screen.queryByText("Login to send a message")).toBeInTheDocument();
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

    renderer(<Product />, {
      auth: { userId: randomProducts[0].user_id, token: "2f4dfd" },
    });

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
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          Authorization: "Bearer 2f4dfd",
        },
      }
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

    renderer(<Product />, { auth: { userId: randomProducts[0].user_id } });

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

  it("Has a link that to login for unauthorized users", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(messagedProduct),
    });

    renderer(<Product />, { auth: { userId: null } });

    expect(
      await screen.findByText("Ergonomic Frozen Towels")
    ).toBeInTheDocument();

    userEvent.click(screen.getByText("Login to send a message"));

    expect(mockNavigate).toHaveBeenCalledWith("/login", {
      replace: true,
      state: {
        from: mockLocation,
      },
    });
  });

  it("Shows messages if logged in", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(messagedProduct),
    });

    renderer(<Product />, {
      auth: { userId: 2, token: "2f4dfd" },
    });

    expect(
      await screen.findByText("Ergonomic Frozen Towels")
    ).toBeInTheDocument();

    expect(
      screen.queryByText(messagedProduct.messages[0].text)
    ).toBeInTheDocument();
  });

  it("Shows no messages if none found when author", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(messagedProductAuthorNoMessages),
    });

    renderer(<Product />, {
      auth: { userId: 7, token: "2f4dfd" },
    });

    expect(
      await screen.findByText("Ergonomic Frozen Towels")
    ).toBeInTheDocument();

    expect(screen.queryByText("No Messages")).toBeInTheDocument();
  });

  it("Can send a new message when logged in", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(messagedProduct),
    });
    window.scrollTo = jest.fn();

    renderer(<Product />, {
      auth: { userId: 2, token: "2f4dfd" },
    });

    expect(
      await screen.findByText("Ergonomic Frozen Towels")
    ).toBeInTheDocument();

    userEvent.type(screen.getByLabelText("Message"), "New message");
    expect(screen.getByLabelText("Message")).toHaveValue("New message");

    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve({ message: "Success" }),
    });

    userEvent.click(screen.getByLabelText("send message"));

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/29",
      {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer 2f4dfd",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: "New message",
          receiver: messagedProduct.user_id,
        }),
      }
    );

    expect(screen.queryByText("New message")).toBeInTheDocument();
    expect(screen.queryByText("New message")!.nodeName).toBe("P");
    expect(screen.getByLabelText("Message")).toHaveValue("");
  });

  it("Can reply to a message as the author of product", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(messagedProductAuthor),
    });
    window.scrollTo = jest.fn();

    renderer(<Product />, {
      auth: { userId: messagedProductAuthor.user_id, token: "2f4dfd" },
    });

    expect(
      await screen.findByText("Ergonomic Frozen Towels")
    ).toBeInTheDocument();

    userEvent.type(screen.getAllByLabelText("Message")[0], "New reply");
    expect(screen.getAllByLabelText("Message")[0]).toHaveValue("New reply");

    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve({ message: "Success" }),
    });

    userEvent.click(screen.getAllByLabelText("send message")[0]);

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/29",
      {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer 2f4dfd",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: "New reply",
          receiver: 9,
        }),
      }
    );

    expect(screen.queryByText("New reply")).toBeInTheDocument();
    expect(screen.queryByText("New reply")!.nodeName).toBe("P");
    expect(screen.getAllByLabelText("Message")[0]).toHaveValue("");
  });

  it("Shows error and resets message if server error", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(messagedProduct),
    });
    window.scrollTo = jest.fn();

    renderer(<Product />, {
      auth: { userId: 2, token: "2f4dfd" },
    });

    expect(
      await screen.findByText("Ergonomic Frozen Towels")
    ).toBeInTheDocument();

    userEvent.type(screen.getByLabelText("Message"), "New message");

    window.fetch = jest.fn().mockReturnValue({
      status: 400,
      json: () => Promise.resolve({ error: "Could not save message" }),
    });

    userEvent.click(screen.getByLabelText("send message"));

    expect(await screen.findByLabelText("Message")).toHaveValue("New message");
    expect(screen.queryByText("Could not save message")).toBeInTheDocument();
  });

  it("Don't send message if invalid", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(messagedProduct),
    });
    window.scrollTo = jest.fn();

    renderer(<Product />, {
      auth: { userId: 2, token: "2f4dfd" },
    });

    expect(
      await screen.findByText("Ergonomic Frozen Towels")
    ).toBeInTheDocument();

    userEvent.click(screen.getByLabelText("send message"));

    expect(await screen.findByText("Message is required")).toBeInTheDocument();
  });
});
