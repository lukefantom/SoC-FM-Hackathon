import React, { useEffect, useState } from "react";

function Spotify() {
  const [playlist, setPlaylist] = useState({});
  const [url, setUrl] = useState("");

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

  console.log(playlist);
  console.log(url);

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

            Authorization: `Bearer BQDp2vVJFluOp4sGFhTK47LNsVGC83TgpuyYQ5FL2lOy_8HWxt_z6iosNTEkapdcICkEP-ewd8eoRMM-k1ctmV-5yk7ohXfs_O29CluBiEFPPn6I_DARxSUHwV6Axtb82eYkprblKW1Nq5dlBOI`,
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
          Authorization: `Bearer BQDp2vVJFluOp4sGFhTK47LNsVGC83TgpuyYQ5FL2lOy_8HWxt_z6iosNTEkapdcICkEP-ewd8eoRMM-k1ctmV-5yk7ohXfs_O29CluBiEFPPn6I_DARxSUHwV6Axtb82eYkprblKW1Nq5dlBOI`,
        },
      });
      const data = await res.json();
    }
    playlist.tracks && getTracks();
  }, [playlist]);

  return (
    <>
      {" "}
      <h1 className="underline">SoC FM</h1>
      <div>
        {" "}
        <button className="btn myBtn" onClick={() => handleClick()}>
          Randomize!
        </button>
        <button className="btn myBtn" onClick={() => newGenre("workout")}>
          Squat FM
        </button>
        <button className="btn myBtn" onClick={() => newGenre("jazz")}>
          Energizer FM
        </button>
        <button className="btn myBtn" onClick={() => newGenre("classical")}>
          Recap Task FM
        </button>
      </div>
      <h5 className="capitalise">{playlist.description}</h5>
      <br />
      <div className="box">
        {" "}
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
    </>
  );
}

export default Spotify;
