import App from "../App";
import { renderer } from "./helpers";

describe("App component", () => {
  test("Renders", () => {
    window.scrollTo = jest.fn();
    renderer(<App />);
  });
});
