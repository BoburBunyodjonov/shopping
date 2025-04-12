import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux"; // ✅ Redux Provider
import App from "./App";
import { queryClient } from "./queryClient";
import "./index.css";
import "./i18n";
import  store  from "./store/store"; // ✅ Corrected path to the Redux store

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}> {/* ✅ Redux kontekst */}
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
