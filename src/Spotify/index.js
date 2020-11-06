import React, { useEffect, useState } from "react";

function Spotify() {
  const [playlist, setPlaylist] = useState({});
  const [url, setUrl] = useState("");
  console.log(playlist);
  console.log(url);
  useEffect(() => {
    async function getTunes() {
      //   const auth = await fetch(
      //     "https://accounts.spotify.com/authorize?client_id=e75f118de4624c43bede99894b2522bd&response_type=code&redirect_uri=soc-spotify-app://localhost:3000%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09"
      //   );

      //   console.log(auth);

      const res = await fetch(
        "https://api.spotify.com/v1/browse/categories/workout/playlists?country=US&limit=50",
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer BQCt5OUSkjnFIgIjy88bcoHiZv1Rr2FwaRi-Iolx8xttSZb1mYH5qraElF5vuNKqO8UYrqQIfC0UP6_ziAj4jaLcRNz_148FuNCFvAYWmw7Hq1YCkzsH9KMAbJ3xB_a41yuIaqTb`,
          },
        }
      );

      const data = await res.json();
      console.log(data);

      const playlist = data.playlists.items[0];

      const newPlaylist = {
        description: playlist.description,
        images: playlist.images[0].url,
        tracks: playlist.tracks.href,
        uri: playlist.uri.slice(17),
      };

      console.log(playlist.uri);

      setPlaylist(newPlaylist);
      playlist.uri &&
        setUrl(`https://open.spotify.com/embed/playlist/${newPlaylist.uri}`);

      // console.log(playlist.description);
      // console.log(playlist.uri);
      // console.log(playlist.images);
      // console.log(playlist.tracks.href);
    }
    getTunes();
  }, []);

  useEffect(() => {
    async function getTracks() {
      console.log(playlist.tracks);
      const res = await fetch(`${playlist.tracks}`, {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer BQChzgVZhKMhFD0_cu89nvkJy5XBTqQ3pTg6SoCARVUeUPwH9Y08bqdWITXEd5M1rHnLESddAXQ6QZcrYr7sdIV_x8Iy6GVvdbvt3LDpt6HzimEtgK8FO5pHOuSw865aQrFZPNaq`,
        },
      });
      const data = await res.json();
      console.log(data);
    }
    playlist.tracks && getTracks();
  }, [playlist]);

  return (
    <div>
      <h1 className="underline"> SoC FM</h1>
      <h3>{playlist.description.toUpperCase()}</h3>
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
