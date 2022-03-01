import { configureStore } from "@reduxjs/toolkit";
import productReducer, { getRandom } from "../store/productSlice";
import { randomProducts } from "./helpers";

const originalFetch = window.fetch;
let store = configureStore({
  reducer: {
    product: productReducer,
  },
});

describe("Product Slice redux testing", () => {
  beforeEach(() => {
    window.fetch = originalFetch;
    store = configureStore({
      reducer: {
        product: productReducer,
      },
    });
  });

  test("State has initial state", () => {
    expect(store.getState().product).toEqual({
      products: [],
      loading: false,
      error: null,
    });
  });

  test("Fetches random products and adds to state", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts),
    });

    await store.dispatch(getRandom());

    const state = store.getState().product;
    expect(state.products.length).toBe(20);
    expect(state.products[0].product_id).toBe(29);
    expect(state.products[0].title).toBe("Ergonomic Frozen Towels");
  });

  test("Should return general error if can't connect", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
    });

    await store.dispatch(getRandom());

    const state = store.getState().product;
    expect(state.error).toBe("Connection error");
    expect(state.loading).toBe(false);
  });
});
