import * as React from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom/client";
import "./ui.css";

import { Nav, activeLink } from "../src/components/nav/Nav";
import { APIKeyPage } from "./pages/APIKeyPage";
import { SearchPage } from "./pages/SearchPage";

function App() {

  const pages = {
    page1: <APIKeyPage />,
    page2: <SearchPage />
  }

  const [pageContent, setPageContent] = useState(pages.page2);

  function checkPage() {
    if (activeLink === "li1") {
      setPageContent(pages.page1);
    } else if (activeLink === "li2") {
      setPageContent(pages.page2);
    }
  }

  return (
    <main>
      <header>
        <Nav onClick={checkPage} />
      </header>
      {pageContent}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("react-page")).render(<App />);
