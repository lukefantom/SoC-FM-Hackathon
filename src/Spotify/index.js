import React, { useEffect, useState } from "react";

function Spotify() {
  useEffect(() => {
    async function getTunes() {
      const res = await fetch(
        "https://api.spotify.com/v1/browse/categories/dinner/playlists?country=SE&limit=10&offset=5",
        {
          headers: {
            accept: "application/json",
            contentType: "application/json",
            authorization: `Bearer BQDBzzhxhzLe_zDhHQebhmnvUkWYaKB4Yg2Ye1UvAfzN5eFHbrmD35-9OMaJMptmhQi7P4AYjO400SgdbEH5mZt_wtecaOjf8TbdOQTul6t3gkziUlyvcMyWVLCCgwl6OAynhjIRQVcekp2flSnnAoViUw`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
    }
    getTunes();
  }, []);
}

export default Spotify;
