import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./hooks/useStore.jsx";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter basename="infinite_battlefield">
    <StoreProvider>
      <App />
    </StoreProvider>
  </BrowserRouter>
);
