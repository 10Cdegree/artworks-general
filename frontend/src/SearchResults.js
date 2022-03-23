import React from "react";
import { Pagination } from "@mui/material";

export default function SearchResults({
  searchResults,
  roleDependentFetch,
  searchResultsPageCount,
  searchArtwork,
  searchQuery,
}) {
  return (
    <div className="search-results-container">
      {searchResults.data.map((element, index) => {
        return (
          <p
            className="searchresult"
            style={{ cursor: "pointer" }}
            onClick={() =>
              roleDependentFetch(element.api_link, "showSearchResult")
            }
            key={index}
          >
            {element.title}
          </p>
        );
      })}
      <div style={{ width: "100%", marginTop: "25px" }}>
        <Pagination
          count={searchResultsPageCount}
          sx={{ justifyContent: "center" }}
          onChange={(e, v) => searchArtwork(searchQuery, v)}
        />
      </div>
    </div>
  );
}
