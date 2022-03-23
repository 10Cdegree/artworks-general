import React, { useState } from "react";

const Gallery = ({ artData, setModalData, setOpenModal }) => {
  return (
    <div className="gallery-view">
      {artData.map((e, i) => {
        return e.image_id ? (
          <div key={i} className="gallery-element">
            <img
              alt={e.title}
              src={`https://www.artic.edu/iiif/2/${e.image_id}/full/843,/0/default.jpg`}
            />
            <div>
              <p className="gallery-title">{e.title}</p>
              <p className="gallery-artist" style={{ marginBottom: "15%" }}>
                {e.artist_title}
              </p>
              <button
                onClick={() => {
                  setModalData(e);
                  setOpenModal(true);
                }}
              >
                View
              </button>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default Gallery;
