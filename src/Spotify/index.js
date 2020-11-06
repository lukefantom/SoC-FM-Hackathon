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
            Authorization: `Bearer BQAjfkukaj9ZNW_ITabXeEWni_M-qYvXacZPF5hVLnvy0DJgd3XFJkPAiEcPy8t4qaRTc_LI9RsFjKgQPA1ZrSEhfp2zw4cHOhJDoy5ApWhNgyvs7t4CJRHqU-iau6HgR0ttiL-h_m1BtOTFASY`,
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
          Authorization: `Bearer BQAjfkukaj9ZNW_ITabXeEWni_M-qYvXacZPF5hVLnvy0DJgd3XFJkPAiEcPy8t4qaRTc_LI9RsFjKgQPA1ZrSEhfp2zw4cHOhJDoy5ApWhNgyvs7t4CJRHqU-iau6HgR0ttiL-h_m1BtOTFASY`,
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
      <h3 className="capitalise">{playlist.description}</h3>
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
