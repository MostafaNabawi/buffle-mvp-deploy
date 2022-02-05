export default function SpotifyLogin() {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=b2cc798a3c574821a3d91efcd4159124&response_type=code&redirect_uri=http://localhost:3000/dashboard&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
  return (
    <div className="Login">
      <a href={AUTH_URL}>Login with Spotify</a>
    </div>
  );
}
