import React, { useEffect, useState } from "react";
import Gallery from "./Gallery";
import "./App.css";
import { Waypoint } from "react-waypoint";
import _ from "lodash";
import TextField from "@mui/material/TextField";
import TransitionsModal from "./ArtViewerModal";
import SearchResults from "./SearchResults";
import Header from "./Modules/Header";

function Exhibition() {
  const [artData, setArtData] = useState();
  const [nextPageLink, setNextPageLink] = useState();
  const [toggleGallery, setToggleGallery] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const [searchResults, setSearchResults] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [searchResultsPageCount, setSearchResultPageCount] = useState();

  useEffect(() => {
    roleDependentFetch("https://api.artic.edu/api/v1/artworks", "galleryData");
  }, []);

  function roleDependentFetch(url, role) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (role === "galleryData") {
          setArtData(data.data);
          setNextPageLink(data.pagination.next_url);
          setToggleGallery(true);
        }
        if (role === "infiniteScroll") {
          const newData = _.flattenDeep([artData, data.data]);
          setArtData(_.uniq(newData));
          setNextPageLink(data.pagination.next_url);
        }

        if (role === "search") {
          setSearchResults(data);
          setSearchResultPageCount(data.pagination.total_pages);
        }
        if (role === "showSearchResult") {
          setModalData(data.data);
          setOpenModal(true);
        }
      });
  }

  function searchArtwork(input = searchQuery, pagenumber = 1) {
    if (!input.length) {
      setToggleGallery(true);
      setSearchQuery();
      roleDependentFetch(
        "https://api.artic.edu/api/v1/artworks",
        "galleryData"
      );
    }

    setSearchQuery(input);
    setToggleGallery(false);
    roleDependentFetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${input}&limit=25&page=${pagenumber}`,
      "search"
    );
  }

  return (
    <div className="App" style={{ marginTop: "100px" }}>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        sx={{ width: "50%", marginBottom: "25px" }}
        onChange={(e) => searchArtwork(e.target.value)}
      />
      {artData && toggleGallery ? (
        <>
          <Gallery
            artData={artData}
            setModalData={setModalData}
            setOpenModal={setOpenModal}
          />
          <Waypoint
            onEnter={() => roleDependentFetch(nextPageLink, "infiniteScroll")}
          />
        </>
      ) : null}

      {!toggleGallery && searchResults ? (
        <SearchResults
          searchResults={searchResults}
          roleDependentFetch={roleDependentFetch}
          searchResultsPageCount={searchResultsPageCount}
          searchArtwork={searchArtwork}
          searchQuery={searchQuery}
        />
      ) : null}
      {modalData ? (
        <TransitionsModal
          data={modalData}
          open={openModal}
          setOpen={setOpenModal}
        />
      ) : null}
    </div>
  );
}

export default Exhibition;
