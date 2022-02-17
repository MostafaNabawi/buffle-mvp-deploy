import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { setUserFeel } from "../../api";
import style from "./style.module.css";
import { API_URL } from "../../config";
import moment from "moment";

export default function Felling() {
  const { addToast } = useToasts();
  const [data, setData] = useState("");
  const [isToday, setIsToday] = useState(false);

  const setFeel = async (type) => {
    setData("");
    setIsToday(false);
    // 1-check type
    // 2-send request
    const req = await setUserFeel(type);
    if (req.status === 200) {
      getFeel();
      addToast("Feel Choosed", {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };
  //
  const getFeel = async () => {
    try {
      await fetch(`${API_URL}/user/feel`, {
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(async (data) => {
        const { payload } = await data.json();
        if (payload.length > 0) {
          if (
            moment(payload.date).format("YYYY-MM-DD").trim() ===
            moment(new Date()).format("YYYY-MM-DD").trim()
          ) {
            console.log("true");
            setData(payload);
            setIsToday(true);
          } else {
            setData("");
            setIsToday(false);
          }
        }
      });
    } catch {}
  };
  useEffect(() => {
    getFeel();
  }, []);
  return (
    <>
      {data && isToday ? (
        <>
          <Image
            title="Smiling"
            className={`feel-icon ${
              data[0]?.feel === "smiling" ? style.selectFeel : ""
            }`}
            src="/icone/1.png"
            alt="vector image"
            onClick={() => setFeel("smiling")}
          />
          <Image
            title="Happy"
            className={`feel-icon ${
              data[0]?.feel === "happy" ? style.selectFeel : ""
            }`}
            src="/icone/2.png"
            alt="vector image"
            onClick={() => setFeel("happy")}
          />
          <Image
            title="Normal"
            className={`feel-icon ${
              data[0]?.feel === "normal" ? style.selectFeel : ""
            }`}
            src="/icone/3.png"
            alt="vector image"
            onClick={() => setFeel("normal")}
          />
          <Image
            title="Said"
            className={`feel-icon ${
              data[0]?.feel === "said" ? style.selectFeel : ""
            }`}
            src="/icone/4.png"
            alt="vector image"
            onClick={() => setFeel("sad")}
          />
          <Image
            title="Crying"
            className={`feel-icon ${
              data[0]?.feel === "crying" ? style.selectFeel : ""
            }`}
            src="/icone/5.png"
            alt="vector image"
            onClick={() => setFeel("crying")}
          />
        </>
      ) : (
        <>
          <Image
            title="Smiling"
            className={`feel-icon`}
            src="/icone/1.png"
            alt="vector image"
            onClick={() => setFeel("smiling")}
          />
          <Image
            title="Happy"
            className={`feel-icon`}
            src="/icone/2.png"
            alt="vector image"
            onClick={() => setFeel("happy")}
          />
          <Image
            title="Normal"
            className={`feel-icon`}
            src="/icone/3.png"
            alt="vector image"
            onClick={() => setFeel("normal")}
          />
          <Image
            title="Said"
            className={`feel-icon`}
            src="/icone/4.png"
            alt="vector image"
            onClick={() => setFeel("said")}
          />
          <Image
            title="Crying"
            className={`feel-icon`}
            src="/icone/5.png"
            alt="vector image"
            onClick={() => setFeel("crying")}
          />
        </>
      )}
    </>
  );
}
