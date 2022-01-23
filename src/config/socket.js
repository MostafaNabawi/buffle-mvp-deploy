import io from "socket.io-client";
import { API_URL } from ".";

const ioInstance = io(API_URL, {
  withCredentials: true,
});
export { ioInstance };
// export default sockt({
//   port: 8000,
//   secure: false,
//   withCredentials: true,
//   host: backend,
