import { useEffect, useState } from "react";
import { SPOTIFY_CLIENT } from "../../config";
import { Icon } from "@iconify/react";
export default function SpotifyLogin() {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const main_uri = "https://accounts.spotify.com/authorize";
    const redirect_uri = window.location.href;
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
    <div className="Login">
      <Icon
        icon="logos:spotify-icon"
        fontSize={30}
        style={{ marginRight: "8px", color: "#fff" }}
      />
      <a style={{ color: "#fff" }} href={url}>
        Login with Spotify to access your music inside buffle 😊.
      </a>
    </div>
  );
}
