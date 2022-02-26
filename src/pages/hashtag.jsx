import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";
import HashtagTable from "../components/hashtag/HashtagTable";
import { DotLoader } from "react-spinners";
import { FormattedMessage } from "react-intl";
function Hashtag() {
  const { tag } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const DynamicTable = useMemo(() => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center">
          <DotLoader size={30} />
        </div>
      );
    }
    if (data.length === 0) {
      return (
        <div>
          <Alert variant="info"><FormattedMessage id="tag.notFount" defaultMessage="Tag Not Found." /></Alert>
        </div>
      );
    }
    return <HashtagTable data={data} />;
  }, [loading, data]);
  useEffect(() => {
    async function getTags() {
      const req = await fetch(`${API_URL}/tags/search-tag?name=${tag}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Content_Type: "application/json",
        },
      });
      const res = await req.json();
      setData(res.payload);
      setLoading(false);
    }
    setLoading(true);
    getTags();
  }, [tag]);
  return (
    <>
      <h3 className="text-center mb-2"><FormattedMessage id="tagResult" defaultMessage="Result For" /> (#{tag})</h3>
      <Row>
        <Col md={12}>{DynamicTable}</Col>
      </Row>
    </>
  );
}

export default Hashtag;
