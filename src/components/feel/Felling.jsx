import React from "react";
import { Image } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import { setUserFeel } from "../../api";
import style from "./style.module.css";
export default function Felling() {
  const { addToast } = useToasts();

  const setFeel = async (type) => {
    // 1-check type
    // 2-send request
    const req = await setUserFeel(type);
    addToast("Feel Choosed", {
      appearance: "success",
    });
  };
  return (
    <>
      <Image
        className={`feel-icon ${style.haha}`}
        src="/icone/1.png"
        alt="vector image"
        onClick={() => setFeel("happy")}
      />
      <Image
        className="feel-icon"
        src="/icone/2.png"
        alt="vector image"
        onClick={() => setFeel("pretty")}
      />
      <Image
        className="feel-icon"
        src="/icone/3.png"
        alt="vector image"
        onClick={() => setFeel("none")}
      />
      <Image
        className="feel-icon"
        src="/icone/4.png"
        alt="vector image"
        onClick={() => setFeel("angry")}
      />
      <Image
        className="feel-icon"
        src="/icone/5.png"
        alt="vector image"
        onClick={() => setFeel("angry")}
      />
    </>
  );
}
