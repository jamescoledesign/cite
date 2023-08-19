import * as React from "react";
import "../ui.css";
import { SearchField } from "../components/search/Search";
import { Results } from "../components/results/Results";

// search results 

export function SearchPage() {
  
  return ( <>

<SearchField />
<Results />
    </>
  );
}