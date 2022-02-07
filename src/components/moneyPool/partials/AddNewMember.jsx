import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Form, Spinner, Button, Table } from "react-bootstrap";
import { API_URL } from "../../../config";
import style from "./../style.module.css";

function AddNewMember({ selected, setSelected }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  function searchEmail() {
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
          setEmail("");
          setLoading(false);
          result.email = email;
          if (selected.length > 0) {
            const exist = selected.filter((user) => user.uid === result.uid);
            if (exist.length === 0) {
              setSelected([...selected, result]);
            }
          }else{
            setSelected([...selected, result]);
          }
        } else {
          setNotFound(true);
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
    }
  }
  const handleDelete = async (id) => {
    const arr = selected.filter((user) => user.uid != id);
    setSelected(arr);
  };

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
        <div style={{ color: "red" }}> User by this email not found! </div>
      )}
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
                <tr key={item.uid}>
                  <td>{item.fullName}</td>
                  <td>{item.email}</td>
                  <th>
                    <i
                      onClick={() => {
                        handleDelete(item.uid);
                      }}
                    >
                      <Icon icon="bx:bx-trash" />
                    </i>
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
