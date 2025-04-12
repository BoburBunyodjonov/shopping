import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import App from "./App";
import { queryClient } from "./queryClient";
import "./index.css";
import "./i18n";
import store from "./store/store";
import { AuthProvider } from "./AuthContext"; // AuthProvider ni import qilamiz

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider> {/* AuthProvider ni qo'shamiz */}
            <App />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);