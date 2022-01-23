import io from "socket.io-client";
const backend = "http://localhost:8000";
const ioInstance = io(backend, {
  withCredentials: true,
});
export { ioInstance };
// export default sockt({
//   port: 8000,
//   secure: false,
//   withCredentials: true,
//   host: backend,
// });
