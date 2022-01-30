import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Form, Spinner, Button, Table } from "react-bootstrap";
import { API_URL } from "../../../config";
import style from "./../style.module.css";
import { useToasts } from "react-toast-notifications";

function AddNewMember({ eventName, currency }) {
  const {addToast}=useToasts()
  console.log("ev...", eventName, currency);
  const [email, setEmail] = useState("");
  // const [result, setResult] = useState([{ name: "reza" }, { name: "ali" }]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [selected, setSelected] = useState([]);
  function searchEmail() {
    console.log("email", email);
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
          email: email,
          moneyPoll: true,
        }),
      }).then(async (response) => {
        const result = await response.json();
        if (result.payload) {
          setLoading(false);
          result.email = email;
          setSelected([...selected, result]);
        } else {
          setNotFound(true);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }

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
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Button
          type="button"
          onClick={() => {
            searchEmail();
          }}
        >
          {loading ? <Icon fontSize={24} icon="eos-icons:loading" /> : "Add"}
        </Button>
      </div>
      {notFound && (
        <div style={{ color: "red" }}>
          {" "}
          User by this email not found. code.{" "}
        </div>
      )}
      {/* {selected.length > 0 && (
        <div className={style.search_result}>
          {selected.map((item, i) => (
            <div key={`selected-${i}`}>{item?.fullName}</div>
          ))}
        </div>
      )} */}
      {/* {loading && (
        <div className={style.search_result}>
          <div className={style.spinner_wrapper}>
            <Spinner animation="border" />
          </div>
        </div>
      )} */}
      {/* {result.length > 0 ?
        <div className={style.search_result}>
          <ul className={style.result_list}>
            {result.map((item) => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
        </div>
      )} */}
      {selected.length > 0 && (
        <div className={style.participants}>
          <Table striped className="mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {selected.map((item) => (
                <tr>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <th>
                    <Icon icon="bx:bx-trash" />
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      
    </div>
  );
}

export default AddNewMember;
