import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import SpotifyWebApi from "spotify-web-api-node";
import { API_URL, SPOTIFY_CLIENT } from "../../config";
import PulseLoader from "react-spinners/PulseLoader";
import Login from "./Login";

const Player = ({ code }) => {
  const [play, setPlay] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const spotifyApi = new SpotifyWebApi({
    clientId: SPOTIFY_CLIENT,
    accessToken: code,
  });
  const [err, setErr] = useState(false);
  useEffect(() => {
    async function getUserPlaylists() {
      spotifyApi.getMySavedAlbums({ offset: 1, limit: 10 }).then((data) => {
        const rndInt = Math.floor(Math.random() * data.body.items.length) + 1;
        console.log("dd", rndInt, data.body.items[rndInt].album.artists[0].uri);
        setData([data.body.items[rndInt].album.artists[0].uri]);
        setLoading(false);
        setPlay(true);
      });
      // spotifyApi.getAlbum({ offset: 1, limit: 5 }).then((data) => {
      //   console.log("user play list", data.body);
      //   if (data.body.items.length > 0) {
      //     getSongs(data.body.items[0]?.id);
      //   }
      // });
    }
    setLoading(true);
    getUserPlaylists();
  }, [code]);

  if (!code) return null;
  if (loading)
    return (
      <div className="d-flex justify-content-center mt-2">
        <PulseLoader size={12} />{" "}
      </div>
    );
  if (err) {
    return <Login />;
  }
  if (data.length > 0) {
    return (
      <SpotifyPlayer
        token={code}
        callback={(state) => !state.isPlaying && setPlay(false)}
        play={play}
        uris={data}
        styles={{
          activeColor: "#fff",
          bgColor: "#333",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#fff",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
          height: "60px",
        }}
      />
    );
  }
  return "";
};

export default Player;
