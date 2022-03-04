import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../store/productSlice";
import {
  getRandom,
  getProduct,
  getAll,
  getCategory,
} from "../store/productThunks";
import {
  allProducts,
  allProductsPage3,
  category1Products,
  randomProducts,
} from "./helpers";

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
      count: "0",
      product: null,
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

  test("Should return error if sent from server", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 404,
      json: () => Promise.resolve({ error: "Bad Request" }),
    });

    await store.dispatch(getRandom());

    const state = store.getState().product;
    expect(state.products.length).toBe(0);
    expect(state.error).toBe("Bad Request");
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

  test("Fetches a single products information", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(randomProducts[0]),
    });

    await store.dispatch(getProduct(29));

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/29",
      {
        method: "GET",
        mode: "cors",
      }
    );

    const state = store.getState().product;
    expect(state.product).not.toBeNull();
    if (state.product) {
      expect(state.product.product_id).toBe(29);
      expect(state.product.title).toBe("Ergonomic Frozen Towels");
    }
  });

  test("Should return error if not a product", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 404,
      json: () => Promise.resolve({ error: "Product not found" }),
    });

    await store.dispatch(getProduct(99));

    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/products/99",
      {
        method: "GET",
        mode: "cors",
      }
    );

    const state = store.getState().product;
    expect(state.product).toBeNull();
    expect(state.error).toBe("Product not found");
  });

  test("Return general error if can't fetch product", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
    });

    await store.dispatch(getProduct(29));

    const state = store.getState().product;
    expect(state.error).toBe("Connection error");
    expect(state.loading).toBe(false);
  });

  test("Gets all products", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(allProducts),
    });
    await store.dispatch(getAll({ page: 1 }));

    const state = store.getState().product;
    expect(state.products).toEqual(allProducts.products);
    expect(state.error).toBe(null);
    expect(state.loading).toBe(false);
    expect(state.count).toBe("50");
  });

  test("Gets all products from another page", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(allProductsPage3),
    });

    await store.dispatch(getAll({ page: 3, count: "50" }));
    const state = store.getState().product;
    expect(state.products).toEqual(allProductsPage3.products);
    expect(state.error).toBe(null);
    expect(state.loading).toBe(false);
    expect(state.count).toBe("50");
  });

  test("Return general error if can't fetch all products", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
    });

    await store.dispatch(getAll({ page: 1 }));

    const state = store.getState().product;
    expect(state.error).toBe("Connection error");
    expect(state.loading).toBe(false);
    expect(state.products).toEqual([]);
  });

  test("Get all products of a specified category", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(category1Products),
    });

    await store.dispatch(getCategory({ category_id: 1, page: 1 }));
    const state = store.getState().product;

    expect(state.products).toEqual(category1Products.products);
    expect(state.error).toBe(null);
    expect(state.loading).toBe(false);
    expect(state.count).toBe(category1Products.count);
  });

  test("Get all products of a category with a 2nd page", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 200,
      json: () => Promise.resolve(category1Products),
    });

    await store.dispatch(getCategory({ category_id: 1, page: 2, count: "28" }));
    const state = store.getState().product;

    expect(state.products).toEqual(category1Products.products);
    expect(state.error).toBe(null);
    expect(state.loading).toBe(false);
    expect(state.count).toBe(category1Products.count);
  });

  test("Return general error if can't fetch category products", async () => {
    window.fetch = jest.fn().mockReturnValue({
      status: 400,
    });

    await store.dispatch(getCategory({ category_id: 1, page: 1 }));

    const state = store.getState().product;
    expect(state.error).toBe("Connection error");
    expect(state.loading).toBe(false);
    expect(state.products).toEqual([]);
  });
});
