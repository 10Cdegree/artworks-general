import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Fab from "@mui/material/Fab";
import Chip from "@mui/material/Chip";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "80vh",
  scroll: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ data, open, setOpen }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function saveArtItem() {
    // Do backend magic here.
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="art-viewer">
              <img
                className="art-viewer-image"
                alt={data.title}
                src={`https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`}
              />
              <div className="art-viewer-info">
                <div className="art-viewer-info-text">
                  {data.artist_title ? (
                    <>
                      <p>~ {data.artist_title} ~</p>
                    </>
                  ) : null}
                  <h2>{data.title}</h2>
                  <p>
                    {data.place_of_origin}, {data.date_display}
                  </p>
                  <p>Medium: {data.medium_display}</p>
                </div>
                <div className="art-viewer-tags">
                  {data.term_titles.map((e, i) => {
                    return (
                      <Chip
                        sx={{ margin: "5px" }}
                        variant="outlined"
                        color="info"
                        key={i}
                        label={e}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <Fab
              color="primary"
              aria-label="save"
              sx={{
                position: "absolute",
                left: "100%",
                transform: "translateX(-50%)",
              }}
              onClick={saveArtItem}
            >
              <BookmarkIcon />
            </Fab>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
