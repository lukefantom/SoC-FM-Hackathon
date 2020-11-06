import React from "react";

function Button({ handleClick, genre, station, myClass }) {
  return (
    <button className={myClass} onClick={() => handleClick(genre, station)}>
      {`${station.charAt(0).toUpperCase()}${station.slice(1)}`}
      {/* Ensures first character is uppercase */}
    </button>
  );
}
export default Button;
