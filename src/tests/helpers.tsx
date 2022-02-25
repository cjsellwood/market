import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ReactElement } from "react";
import { RootState } from "../store/store";
import authReducer from "../store/authSlice";
import { render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";

export const renderer = (
  element: ReactElement,
  preloadedState: RootState | {} = {}
) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <HashRouter> {element}</HashRouter>
    </Provider>
  );
};
