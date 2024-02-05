import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { App } from "src/app/App";

import "./index.css";
import StoreProvider from "src/components/molecules/StoreProvider";

let rootEl = document.getElementById("root");

if (!rootEl) {
  rootEl = document.createElement("div");
  rootEl.id = "root";

  document.body.append(rootEl);
}

const root = createRoot(rootEl);

const rootElement = () => {
  return createElement(StoreProvider, { children: createElement(App) });
};

root.render(rootElement());
