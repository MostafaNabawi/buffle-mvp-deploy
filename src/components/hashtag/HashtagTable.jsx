import React from "react";
import { Card, Table } from "react-bootstrap";

function HashtagTable({ data }) {
  return (
    <Card>
      <Table responsive>
        <thead>
          <tr>
            <th>fullName</th>
            <th>Tag Name</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Card>
  );
}

export default HashtagTable;
