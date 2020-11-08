import React, { useState } from "react";
import soc from "./soc.png";
import "./App.css";
import Spotify from "./Spotify";

function App() {
  const [playlistIndex, setPlaylistIndex] = useState(
    Math.floor(Math.random() * 50)
  );

  function handleClick() {
    setPlaylistIndex(Math.floor(Math.random() * 50));
  }

  return (
    <div className="App">
      <nav className="nav-bar">
        <img className="logo" src={soc} alt="soc" />
      </nav>
      <header className="App-header">
        <Spotify handleClick={handleClick} playlistIndex={playlistIndex} />
      </header>
    </div>
  );
}

export default App;
