import React, { useEffect, useState } from "react";

function Spotify() {
  const [playlist, setPlaylist] = useState({});
  const [url, setUrl] = useState("");
<<<<<<< HEAD
  const [playlistIndex, setPlaylistIndex] = useState(
    Math.floor(Math.random() * 50)
  );
  const [genre, setGenre] = useState("workout");

  function newGenre(genre) {
    setGenre(genre);
    handleClick();
  }
  console.log(genre);
  function handleClick() {
    setPlaylistIndex(Math.floor(Math.random() * 50));
    console.log(playlistIndex);
  }

=======
  console.log(playlist);
  console.log(url);
>>>>>>> main
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
            Authorization: `Bearer BQBuUA2UFebneW8Dz8iCTBcn-2R64uN3eMKcRoXd1HkVzAFT2cMFsFnwsilSTzp3o-nowFPON6kobA4XM_KWN1JflIweOcBPy_F5c20-tXQkD33Y1vtHt05mJtGZ8xMvjiVRBRpIDM97nSo`,
          },
        }
      );

      const data = await res.json();
      // console.log(data);

      const playlist = data.playlists.items[playlistIndex];

      const newPlaylist = {
        description: playlist.description,
        images: playlist.images[0].url,
        tracks: playlist.tracks.href,
        uri: playlist.uri.slice(17),
      };

<<<<<<< HEAD
=======
      console.log(playlist.uri);

>>>>>>> main
      setPlaylist(newPlaylist);
      playlist.uri &&
        setUrl(`https://open.spotify.com/embed/playlist/${newPlaylist.uri}`);

      // console.log(playlist.description);
      // console.log(playlist.uri);
      // console.log(playlist.images);
      // console.log(playlist.tracks.href);
    }
<<<<<<< HEAD
    genre && getTunes();
  }, [playlistIndex]);
=======
    getTunes();
  }, []);
>>>>>>> main

  useEffect(() => {
    async function getTracks() {
      const res = await fetch(`${playlist.tracks}`, {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer BQDBNETB7ovpYHCpkDaHdld_l9EGxA-pVGPjvmn_R2fS12NRFT_H0ZjtlubPoo81PE1Zu3pYe2KTtsrtEoPZ8BGRyEhm3AjRIGvSFUP-gA8gY9QgRL8HaTy8FaYZMN2NjAHiVNhxzpX5oIY`,
        },
      });
      const data = await res.json();
    }
    playlist.tracks && getTracks();
  }, [playlist]);

  return (
    <div>
<<<<<<< HEAD
      <h1>{playlist.description}</h1>
      <button onClick={() => handleClick()}>Randomize!</button>
      <button onClick={() => newGenre("workout")}>Squat FM</button>
      <button onClick={() => newGenre("jazz")}>Energizer FM</button>
      <button onClick={() => newGenre("classical")}>Recap Task FM</button>

=======
      <h1 className="underline"> SoC FM</h1>
      <h3>{playlist.description.toUpperCase()}</h3>
>>>>>>> main
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
  );
}

export default Spotify;
