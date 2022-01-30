import { Icon } from "@iconify/react";
import { useState } from "react";
import { Form, Spinner, Button } from "react-bootstrap";
import { API_URL } from "../../../config";
import style from "./../style.module.css";

function AddNewMember() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState([{ name: "reza" }, { name: "ali" }]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(true);
  const [selected, setSelected] = useState([]);

  const handleAdd = (uid) => {
    console.log("added", uid);
    setSelected([...selected, uid]);
  };
  function handleSubmit(e) {
    setEmail(e.target.value);
    const value =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      );
    if (value) {
      setLoading(true);
      setNotFound(false);
      fetch(`${API_URL}/user/find`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          email: e.target.value,
          moneyPoll: true,
        }),
      }).then(async (response) => {
        const data = await response.json();
        console.log("rr", data);
        if (data?.payload) {
          setLoading(false);
          setResult([data]);
        } else {
          setNotFound(true);
        }
      });
    } else {
      setLoading(false);
    }
  }
  console.log(email)
  return (
    <div className={style.participants_wrapper}>
      <div className={style.input_with_button}>
        <Form.Group className="mb-3" controlId="person-1">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            value={email}
            autoComplete="false"
            aria-haspopup="false"
            autoFocus="false"
            placeholder="Email"
            onChange={(e) =>{
              console.log("on change")
              setEmail(e.target.value)
            }}
          />
        </Form.Group>
        <Button type="button" onClick={handleSubmit}>
          Search
        </Button>
      </div>
      {notFound && (
        <div className={style.search_result}>
          <div className={style.spinner_wrapper}>
            <span style={{ color: "red" }}> User by this email not found, if you want to add please set invite code. </span>
          </div>
        </div>
      )}
      {selected.length > 0 && (
        <div className={style.search_result}>
          {selected.map((item, i) => (
            <div key={`selected-${i}`}>{item?.fullName}</div>
          ))}
        </div>
      )}
      {loading && (
        <div className={style.search_result}>
          <div className={style.spinner_wrapper}>
            <Spinner animation="border" />
          </div>
        </div>
      )}
      {result.length > 0 && (
        <div className={style.search_result}>
          <ul className={style.result_list}>
            {result.map((item) => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={style.participants}>
        {result.map((item) => (
          <span key={item.name}>
            {item.name} {/* <i className={style.participants_dismiss}>x</i> */}
          </span>
        ))}
      </div>
    </div>
  );
}

export default AddNewMember;
