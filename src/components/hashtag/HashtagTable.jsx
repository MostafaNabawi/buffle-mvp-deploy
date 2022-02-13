import { Icon } from "@iconify/react";
import { useState } from "react";
import { Card, Table } from "react-bootstrap";
import { API_URL } from "../../config";
function HashtagTable({ data }) {
  const [working, setWorking] = useState(false);
  const pingUser = (e, id) => {
    if (!working) {
      setWorking(true);
      e.currentTarget.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><g transform="rotate(-90 12 12)"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8z" opacity=".5" fill="rgba(68, 221, 221, 0.6)"/><path d="M20 12h2A10 10 0 0 0 12 2v2a8 8 0 0 1 8 8z" fill="rgba(68, 221, 221, 0.6)"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></path></g></svg>`;
      fetch(`${API_URL}`);
    }
  };
  return (
    <Card>
      <Table responsive>
        <thead>
          <tr>
            <th>fullName</th>
            <th>Tag Name</th>
            <th>Ping</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return item.userSelected.map((user, n) => {
              return (
                <tr key={`t-${index}-u-${n}`}>
                  <td> {user?.first_name + " " + user?.last_name} </td>
                  <td> {item?.name} </td>
                  <td>
                    {" "}
                    <Icon
                      icon="si-glyph:ping-pong-racket"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => pingUser(e, user?._id)}
                    />{" "}
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
