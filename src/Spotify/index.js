import React, { useEffect, useState } from "react";
import Button from "../Button";

function Spotify() {
  const [playlist, setPlaylist] = useState({});
  const [url, setUrl] = useState("");
  const [playlistIndex, setPlaylistIndex] = useState(
    Math.floor(Math.random() * 50)
  );
  const [genre, setGenre] = useState("workout");
  const [station, setStation] = useState("Squat FM");

  function newGenre(genre, station) {
    setGenre(genre);
    setStation(station);
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

            Authorization: `Bearer BQBTmmuX3zUjn6EFDvb3nF4SKDWKAhRHda6clp8rOClCbb1OEu6OWjGmxFd8k3YQTpacbSi1bZRD-1FCEtFDNm7IZ2-NWIzqURXTOMS76iCfkdllGC0K8SgmL55RlkWMvY5sfeB53vpk-0xva0nqel51sg`,
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
    }
    genre && getTunes();
  }, [playlistIndex, genre]);

  // useEffect(() => {
  //   async function getTracks() {
  //     const res = await fetch(`${playlist.tracks}`, {
  //       headers: {
  //         accept: "application/json",
  //         "content-type": "application/json",

  //         Authorization: `Bearer BQCFL2xvCJy43AIdaye1XDyJy0NpiPfp3IfssDZ333RVzSoMyIZkY9-OOhjJUdrzvXjuBgbA0RwAhmypA_mhyt_H4B9ZD9o1quRoq4WEqfmqeIHuTYs1gl8xlhF_EvrZIacIBeA-OtBeVAF64pg`,
  //       },
  //     });
  //     const data = await res.json();
  //   }
  //   playlist.tracks && getTracks();
  // }, [playlist]);

  return (
    <div>
      <h1 className="underline"> SoC FM</h1>
      {station && <h6>You Are Now Listening to {station}</h6>}

      <div>
        <h5>Choose Your Station</h5>
        <Button
          myClass={"btn myBtn"}
          handleClick={newGenre}
          genre={"workout"}
          station={"Squat FM"}
        />
        <Button
          myClass={"btn myBtn"}
          handleClick={newGenre}
          genre={"jazz"}
          station={"Energizer FM"}
        />
        <Button
          myClass={"btn myBtn"}
          handleClick={newGenre}
          genre={"classical"}
          station={"Recap Task FM"}
        />
        <Button
          myClass={"btn myPlaylistBtn"}
          handleClick={handleClick}
          station={"New Playlist"}
        />
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
