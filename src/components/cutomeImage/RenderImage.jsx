import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { readImage } from "../../api/readImage";

export default function RenderImage({ code, type = 2 }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function readInnerImage() {
      const result = await readImage(code);
      setUrl(result);
      setLoading(false);
    }
    if (code !="") {
      readInnerImage();
    }
  }, [code]);
  if (code === "" && type === 2) {
    return (
      <Image
        className="breakplan-img"
        src="/icone/WB_Headshots-102-web 1.png"
      />
    );
  }
  if (code ==="" && type === 1) {
    return (
      <Image
        src="/icone/WB_Headshots-102-web 1.png"
        id="header-img"
        className="sidebar-icon"
      />
    );
  }
  if (loading && type === 2) {
    return (
      <div style={{ marginTop: "-11px" }}>
        <Skeleton style={{ borderRadius: "48%" }} width={37} height={37} />
      </div>
    );
  }
  if (loading && type === 1) {
    return (
      <div style={{ marginTop: "-9px", marginLeft: "-5px" }}>
        <Skeleton style={{ borderRadius: "50%" }} width={55} height={55} />
      </div>
    );
  }
  if (type === 1) {
    return (
      <Image
        style={{
          borderRadius: "50%",
          objectFit: "cover",
        }}
        id="header-img"
        className="sidebar-icon"
        src={url}
        alt="user"
      />
    );
  }
  return (
    <Image
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        objectFit: "cover",
        objectPosition: "center",
      }}
      className="breakplan-img"
      src={url}
      alt="user"
    />
  );
}
