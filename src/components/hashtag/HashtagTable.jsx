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
      e.currentTarget.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><g transform="rotate(-90 12 12)"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8z" opacity=".5" fill="rgba(68, 221, 221, 0.6)"/><path d="M20 12h2A10 10 0 0 0 12 2v2a8 8 0 0 1 8 8z" fill="rgba(68, 221, 221, 0.6)"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></path></g></svg>`;
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
          ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 15 15"><g fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0zm7.072 3.21l4.318-5.398l-.78-.624l-3.682 4.601L4.32 7.116l-.64.768l3.392 2.827z" fill="#e72"/></g></svg>`;
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
