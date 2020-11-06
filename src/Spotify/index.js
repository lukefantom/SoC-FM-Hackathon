import React, { useEffect, useState } from "react";

function Spotify() {
  const [playlist, setPlaylist] = useState({});
  useEffect(() => {
    async function getTunes() {
      const res = await fetch(
        "https://api.spotify.com/v1/browse/categories/workout/playlists?country=US&limit=50",
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer BQCbFWwfklxN-Cr66OuaGWvFb1Tr5GJylisddtPNQV-J8js7P7VPswacCQd4LJccTWE22FIFgJbeAXlJu37oTM6Il2R5U4uBEhZFoo28nLvYvldGBS2IFdXIm7pBZagctq8ulWjHCzSSzoz3i92kTvvFL0TcIJtNdMcjBAg`,
          },
        }
      );
      const data = await res.json();
      const playlist = data.playlists.items[0];
      console.log(playlist.description);
      console.log(playlist.uri);
      console.log(playlist.images);
      console.log(playlist.tracks.href);
    }
    getTunes();
  }, []);

  useEffect(() => {
    async function getTracks() {
      const res = await fetch(
        `https://api.spotify.com/v1/playlists/37i9dQZF1DX76Wlfdnj7AP/tracks`,
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer BQCbFWwfklxN-Cr66OuaGWvFb1Tr5GJylisddtPNQV-J8js7P7VPswacCQd4LJccTWE22FIFgJbeAXlJu37oTM6Il2R5U4uBEhZFoo28nLvYvldGBS2IFdXIm7pBZagctq8ulWjHCzSSzoz3i92kTvvFL0TcIJtNdMcjBAg`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
    }
    getTracks();
  }, []);
  return <div>Hi</div>;
}

export default Spotify;
