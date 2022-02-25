import { Icon } from "@iconify/react";
import { useState } from "react";
import { Card, Table } from "react-bootstrap";
import { API_URL } from "../../config";
import RenderImage from "../cutomeImage/RenderImage";
import { FormattedMessage } from "react-intl";

function HashtagTable({ data }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [working, setWorking] = useState(false);
  console.log("dd", data);
  const pingUser = (e, id, name, tr) => {
    let fullName = JSON.parse(localStorage.getItem("user"));
    fullName = fullName?.first_name + " " + fullName?.last_name;
    if (!working) {
      setWorking(true);
      e.currentTarget.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#4bd37b"/><path fill="#fff" d="M46 14L25 35.6l-7-7.2l-7 7.2L25 50l28-28.8z"/></svg>`;
      fetch(`${API_URL}/user/ping`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid: id, fullName: fullName, tagName: name }),
      }).then((response) => {
        if (response.status === 200) {
          setWorking(false);
          document.getElementById(
            tr
          ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#4bd37b"/><path fill="#fff" d="M46 14L25 35.6l-7-7.2l-7 7.2L25 50l28-28.8z"/></svg>`;
        }
      });
    }
  };

  return (
    <Card>
      <Table responsive>
        <thead>
          <tr>
            <th>
              <FormattedMessage defaultMessage="full Name" id="user.fullName" />
            </th>
            <th>
              <FormattedMessage defaultMessage=" Tag Name" id="app.tagName" />
            </th>
            <th>
              <FormattedMessage defaultMessage="Ping" id="app.ping" />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return item.userSelected.map((user, n) => {
              return (
                <tr key={`t-${index}-u-${n}`}>
                  <td className="d-flex p-2 align-items-center">
                    <RenderImage code={user?.avatar?.key || ""} />
                    <span className="tagUserName text-capitalize">
                      {user?.first_name + " " + user?.last_name}
                    </span>
                  </td>
                  <td> {item?.name} </td>
                  <td id={`item-${index}-u-${n}`}>
                    {" "}
                    {user?._id === currentUser._id ? (
                      ""
                    ) : (
                      <Icon
                        icon="si-glyph:ping-pong-racket"
                        style={{ cursor: "pointer" }}
                        onClick={(e) =>
                          pingUser(
                            e,
                            user?._id,
                            item?.name,
                            `item-${index}-u-${n}`
                          )
                        }
                      />
                    )}{" "}
                  </td>
                </tr>
              );
            });
          })}
        </tbody>
      </Table>
    </Card>
  );
}

export default HashtagTable;
