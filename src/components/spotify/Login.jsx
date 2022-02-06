import { useEffect, useState } from "react";
import { SPOTIFY_CLIENT } from "../../config";

export default function SpotifyLogin() {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const main_uri = "https://accounts.spotify.com/authorize";
    const redirect_uri = window.location.href;
    console.log("rrr", redirect_uri);
    const scopes = [
      "streaming",
      "user-read-email",
      "user-read-private",
      "user-library-read",
      "user-library-modify",
      "user-read-playback-state",
      "user-modify-playback-state",
      "playlist-read-collaborative",
      "playlist-read-private",
    ];
    const full_url = `${main_uri}?client_id=${SPOTIFY_CLIENT}&response_type=code&show_dialog=true&redirect_uri=${redirect_uri}&scope=${scopes.join(
      "%20"
    )}`;
    setUrl(full_url);
  }, []);
  return (
    <div className="Login" style={{ color: "white" }}>
      <a href={url}>Login with Spotify</a>
    </div>
  );
}
