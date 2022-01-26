import io from "socket.io-client";
import { API_URL } from ".";

const MAIN_URL = API_URL.split("/api")[0];
const ioInstance = io(MAIN_URL, {
  withCredentials: true,
});
export { ioInstance };
