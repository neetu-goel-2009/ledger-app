import React from "react";
import ReactDOM from "react-dom/client";
import Framework7 from "framework7/bundle";
import Framework7React from "framework7-react";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

import App from "./App.tsx";
import theme from "./styles/theme";

import "framework7/css/bundle";
import "./index.scss";

Framework7.use(Framework7React);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
