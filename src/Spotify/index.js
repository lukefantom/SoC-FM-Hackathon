import React, { useEffect, useState } from "react";

function Spotify() {
  const [playlist, setPlaylist] = useState({});
  console.log(playlist)

  useEffect(() => {
    async function getTunes() {
      const res = await fetch(
        "https://api.spotify.com/v1/browse/categories/workout/playlists?country=US&limit=50",
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer BQC_1egTwN5QTsCw4nYfSdFc7IB6pIO90XE5E-E1g1bLcsUiXh_tUVAwt1yuIvX192BBCcsGktspE44zNr82nCGFpzZsiOzKjbgYFR2uN_wf1FD39nDjN4jBi15_Sbc13YFnSjzc`,
          },
        }
      );

      const data = await res.json();
      console.log(data)

      const playlist = data.playlists.items[0];

      const newPlaylist = {
          description: playlist.description,
          images: playlist.images[0].url,
          tracks: playlist.tracks.href,
          uri: playlist.uri
        }

      setPlaylist(newPlaylist);
      

      // console.log(playlist.description);
      // console.log(playlist.uri);
      // console.log(playlist.images);
      // console.log(playlist.tracks.href);
    }
    getTunes();
  }, []);

  useEffect(() => {
    async function getTracks() {
      console.log(playlist.tracks)
      const res = await fetch(
        `${playlist.tracks}`,
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer BQDGfFfhn-CaN0FaflabHbdrDab5-4_ojcjATgtsT1eXSgb6_b-L5_MKoZ7706oL8yQa8OH47V8d317Oxmxxo1N_sncB3RPyZ7C81HMYqHSYVYBmgTSGE2f2ZqaXeY42jpN9CLiA`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
    }
    getTracks();
  }, [playlist]);

  return <div>
    <h1>{playlist.description}</h1>
    <img src={playlist.images} alt="" /> 
  </div>;
}

export default Spotify;
