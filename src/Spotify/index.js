import React, { useEffect, useState } from "react";

function Spotify() {
  const [playlist, setPlaylist] = useState({});
  const [url, setUrl] = useState("");
  const [playlistIndex, setPlaylistIndex] = useState(
    Math.floor(Math.random() * 50)
  );
  const [genre, setGenre] = useState("workout");
  const [station, setStation] = useState("Squat FM");

  function newStation(station) {
    setStation(station);
  }

  function newGenre(genre, station) {
    setGenre(genre);
    newStation(station);
    handleClick();
  }
  console.log(genre);
  function handleClick() {
    setPlaylistIndex(Math.floor(Math.random() * 50));
    console.log(playlistIndex);
  }

  useEffect(() => {
    async function getTunes() {
      //   const auth = await fetch(
      //     "https://accounts.spotify.com/authorize?client_id=e75f118de4624c43bede99894b2522bd&response_type=code&redirect_uri=soc-spotify-app://localhost:3000%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09"
      //   );

      //   console.log(auth);

      const res = await fetch(
        `https://api.spotify.com/v1/browse/categories/${genre}/playlists?country=US&limit=50`,
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",

            Authorization: `Bearer BQCFL2xvCJy43AIdaye1XDyJy0NpiPfp3IfssDZ333RVzSoMyIZkY9-OOhjJUdrzvXjuBgbA0RwAhmypA_mhyt_H4B9ZD9o1quRoq4WEqfmqeIHuTYs1gl8xlhF_EvrZIacIBeA-OtBeVAF64pg`,
          },
        }
      );

      const data = await res.json();
      console.log(data);

      const playlist = data.playlists.items[playlistIndex];

      const newPlaylist = {
        description: playlist.description,
        name: playlist.name,
        images: playlist.images[0].url,
        tracks: playlist.tracks.href,
        uri: playlist.uri.slice(17),
      };

      setPlaylist(newPlaylist);
      playlist.uri &&
        setUrl(`https://open.spotify.com/embed/playlist/${newPlaylist.uri}`);

      // console.log(playlist.description);
      // console.log(playlist.uri);
      // console.log(playlist.images);
      // console.log(playlist.tracks.href);
    }
    genre && getTunes();
  }, [playlistIndex]);

  useEffect(() => {
    async function getTracks() {
      const res = await fetch(`${playlist.tracks}`, {
        headers: {
          accept: "application/json",
          "content-type": "application/json",

          Authorization: `Bearer BQCFL2xvCJy43AIdaye1XDyJy0NpiPfp3IfssDZ333RVzSoMyIZkY9-OOhjJUdrzvXjuBgbA0RwAhmypA_mhyt_H4B9ZD9o1quRoq4WEqfmqeIHuTYs1gl8xlhF_EvrZIacIBeA-OtBeVAF64pg`,
        },
      });
      const data = await res.json();
    }
    playlist.tracks && getTracks();
  }, [playlist]);

  return (
    <div>
      <h1 className="underline"> SoC FM</h1>
      {station && <h6>You Are Now Listening to {station}</h6>}

      <div>
        <h5>Choose Your Station</h5>
        <button
          className="btn myBtn"
          onClick={() => newGenre("workout", "Squat FM")}
        >
          Squat FM
        </button>
        <button
          className="btn myBtn"
          onClick={() => newGenre("jazz", "Energizer FM")}
        >
          Energizer FM
        </button>
        <button
          className="btn myBtn"
          onClick={() => newGenre("classical", "Recap Task FM")}
        >
          Recap Task FM
        </button>

        <button className="btn myPlaylistBtn" onClick={() => handleClick()}>
          New Playlist
        </button>
      </div>

      {playlist.name && <h4>{playlist.name.toUpperCase()}</h4>}
      {playlist.description && <h3>{playlist.description.toUpperCase()}</h3>}
      <div className="box">
        <iframe
          title="playlist"
          src={url}
          // https://open.spotify.com/embed/playlist/spotify:playlist:37i9dQZF1DX76Wlfdnj7AP
          width="300"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
        <img className="myImage" src={playlist.images} alt="" />
      </div>
    </div>
  );
}

export default Spotify;
