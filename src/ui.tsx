import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { MemoryRouter as Router , Routes, Route } from "react-router-dom";
import "./ui.css";
import { Layout } from "./pages/Layout";
import { APIKeyPage } from "./pages/APIKeyPage";
import { SearchPage } from "./pages/SearchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<APIKeyPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="*" element={<p>Page does not exist</p>} />
        </Route>
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("react-page")).render(<App />);
