"use client";

import { Provider } from "react-redux";
import store from "./index";

export default function ProviderComponent({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
