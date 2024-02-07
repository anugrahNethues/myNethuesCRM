"use client";

import { Provider } from "react-redux";
import store from "./store";
import { PropsWithChildren } from "react";

type ProviderComponentProps = PropsWithChildren<{}>;

export default function ProviderComponent({
  children,
}: ProviderComponentProps) {
  return <Provider store={store}>{children}</Provider>;
}
