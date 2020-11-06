import React, { useEffect, useState } from "react";

function Spotify() {
  useEffect(() => {
    async function getTunes() {
      const res = await fetch(
        "https://api.spotify.com/v1/browse/categories/dinner/playlists?country=SE&limit=10&offset=5",
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
    getTunes();
  }, []);
  return <div>Hi</div>;
}

export default Spotify;
