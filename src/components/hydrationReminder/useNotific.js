import { useEffect, useRef, useState } from "react";

function useNotific(callback, delay) {
  const savedCallback = useRef();
  // const [id, setId] = useState("");
  // if (id !== "") {
  //   clearInterval(id);
  // }

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useNotific;
