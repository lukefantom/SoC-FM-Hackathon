import React, { useEffect, useState } from "react";
import request from "request";
import Button from "../Button";
import { authOptions } from "../Helper/auth";
import { MediaPlayer } from "../MediaPlayer";

function Spotify({ playlistIndex, handleClick }) {
  // State containing playlist info pulled from API
  const [playlist, setPlaylist] = useState({});
  // State containing url sliced from current playlist uri
  const [url, setUrl] = useState("");
  // State containing genre used in Playlist search to API
  const [genre, setGenre] = useState("workout");
  // State containing string of current "radio station" playing
  const [station, setStation] = useState("Squat FM");

  /**
   * Changes "station" - selects new genre search to API, updates station state, calls handle click to update playlistIndex
   * @param {string} genre
   * @param {string} station
   */
  function newGenre(genre, station) {
    setGenre(genre);
    setStation(station);
    handleClick();
  }

  useEffect(() => {
    async function getTunes() {
      request.post(authOptions, async function (error, response, body) {
        if (!error && response.statusCode === 200) {
          // use the access token to access the Spotify Web API
          const token = body.access_token;
          const options = {
            url: `https://api.spotify.com/v1/browse/categories/${genre}/playlists?country=US&limit=50`,
            headers: {
              Authorization: "Bearer " + token,
            },
            json: true,
          };
          request.get(options, async function (error, response, body) {
            const playlist = body.playlists.items[playlistIndex];

            // Pulling individual playlist data from API storing in an object
            const newPlaylist = {
              description: playlist.description,
              name: playlist.name,
              images: playlist.images[0].url,
              tracks: playlist.tracks.href,
              uri: playlist.uri.slice(17),
            };

            // Update playlist state with new playlist object from API
            setPlaylist(newPlaylist);
            playlist.uri &&
              setUrl(
                `https://open.spotify.com/embed/playlist/${newPlaylist.uri}`
              );
          });
        }
      });
    }
    genre && getTunes();
  }, [playlistIndex, genre]);

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
        />{" "}
      </div>

      {playlist.name && <h5>{playlist.name.toUpperCase()}</h5>}

      {playlist.description && <h5>{playlist.description.toUpperCase()}</h5>}

      {playlist.images && <MediaPlayer url={url} imageSrc={playlist.images} />}
    </div>
  );
}

export default Spotify;
