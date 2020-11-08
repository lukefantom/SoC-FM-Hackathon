import React from "react";

export const MediaPlayer = ({ url, imageSrc }) => {
  return (
    <div className="box">
      <iframe
        title="playlist"
        src={url}
        width="300"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
      <img className="myImage" src={imageSrc} alt="current playlist" />
    </div>
  );
};
