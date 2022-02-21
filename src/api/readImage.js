import { API_URL } from "../config";

async function readImage(key) {
  if (key === "") {
    return "/icone/WB_Headshots-102-web 1.png";
  }
  const req = await fetch(`${API_URL}/user/my-avatar?key=${key}`, {
    credentials: "include",
  });
  if (req.status === 500) {
    return "/icone/WB_Headshots-102-web 1.png";
  }
  const main = await req.blob().then((myBlob) => {
    var objectURL = URL.createObjectURL(myBlob);
    return objectURL;
  });
  return main;
}

export { readImage };
