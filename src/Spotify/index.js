import React, { useEffect, useState } from "react";
import request from "request";
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
      //const auth = await fetch();
      //     "https://accounts.spotify.com/authorize?client_id=e75f118de4624c43bede99894b2522bd&response_type=code&redirect_uri=soc-spotify-app://localhost:3000%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09"

      //   console.log(auth);

      // const request = require("request"); // "Request" library

      const client_id = "e75f118de4624c43bede99894b2522bd"; // Your client id
      const client_secret = "e9b4f023a2d94ff0a290b61d31584824"; // Your secret

      // your application requests authorization
      const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        form: {
          grant_type: "client_credentials",
        },
        json: true,
      };

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
            console.log(body.playlists);
            // const data = await response.json();
            // console.log(data);

            const playlist = body.playlists.items[playlistIndex];
            console.log(playlist);

            const newPlaylist = {
              description: playlist.description,
              name: playlist.name,
              images: playlist.images[0].url,
              tracks: playlist.tracks.href,
              uri: playlist.uri.slice(17),
            };

            setPlaylist(newPlaylist);
            playlist.uri &&
              setUrl(
                `https://open.spotify.com/embed/playlist/${newPlaylist.uri}`
              );
          });
        }
      });

      // const res = await fetch(
      //   `https://api.spotify.com/v1/browse/categories/${genre}/playlists?country=US&limit=50`,
      //   {
      //     headers: {
      //       accept: "application/json",
      //       "content-type": "application/json",

      //       Authorization: `Bearer BQCFL2xvCJy43AIdaye1XDyJy0NpiPfp3IfssDZ333RVzSoMyIZkY9-OOhjJUdrzvXjuBgbA0RwAhmypA_mhyt_H4B9ZD9o1quRoq4WEqfmqeIHuTYs1gl8xlhF_EvrZIacIBeA-OtBeVAF64pg`,
      //     },
      //   }
      // );

      // console.log(playlist.description);
      // console.log(playlist.uri);
      // console.log(playlist.images);
      // console.log(playlist.tracks.href);
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
        />{" "}
      </div>

      {playlist.name && <h5>{playlist.name.toUpperCase()}</h5>}

      {playlist.description && <h5>{playlist.description.toUpperCase()}</h5>}
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
