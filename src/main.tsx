import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { EventProvider } from "./contexts/EventContext.tsx";
import "./styles.css";
import { CurrentDateProvider } from "./contexts/TodayContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CurrentDateProvider>
      <EventProvider>
        <App />
      </EventProvider>
    </CurrentDateProvider>
  </StrictMode>
);
