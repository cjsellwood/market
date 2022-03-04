import { store } from "../store/store";

describe("Test the redux store", () => {
  test("store should be created", () => {
    expect(store.getState().auth).not.toBeUndefined();
    expect(store.getState().product).not.toBeUndefined();
  });
});
