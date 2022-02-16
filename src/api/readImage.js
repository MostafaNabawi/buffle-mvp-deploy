import { API_URL } from "../config";

async function readImage(key) {
  if (key.length === 0) {
    return "/icone/WB_Headshots-102-web 1.png";
  }
  console.log("key", key);
  const req = await fetch(`${API_URL}/user/my-avatar?key=${key}`, {
    credentials: "include",
  });
  const main = await req.blob().then((myBlob) => {
    var objectURL = URL.createObjectURL(myBlob);
    return objectURL;
  });
  console.log("main", main);
  return main;
}

export { readImage };
