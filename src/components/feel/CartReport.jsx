import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card, Row, Col, Form } from "react-bootstrap";
import { API_URL } from "../../config";
const { faker } = require("@faker-js/faker");

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Feel report",
    },
  },
};

const labels = ["", "1 Week", "2 Week", "3 Week", "4 Week"];

const CharReport = () => {
  const [basy, setBasy] = useState(false);
  //
  const [smiling, setSmiling] = useState([]);
  const [happy, setHappy] = useState([]);
  const [normal, setNormal] = useState([]);
  const [sad, setSad] = useState([]);
  const [cry, setCry] = useState([]);
  // data
  const data = {
    labels,
    datasets: [
      {
        label: "Happy",
        data: happy,
        borderColor: "rgb(235,129,115)",
        backgroundColor: "rgba(235,129,115, 0.5)",
      },
      {
        label: "Smiling",
        data: smiling,
        borderColor: "rgb(238,180,21)",
        backgroundColor: "rgba(238,180,21, 0.5)",
      },
      {
        label: "Normal",
        data: normal,
        borderColor: "rgb(122,252,67)",
        backgroundColor: "rgba(122,252,67, 0.5)",
      },
      {
        label: "Sad",
        data: sad,
        borderColor: "rgb(52,109,139)",
        backgroundColor: "rgba(52,109,139, 0.5)",
      },
      {
        label: "Crying",
        data: cry,
        borderColor: "rgb(25,55,105)",
        backgroundColor: "rgba(25,55,105, 0.5)",
      },
    ],
  };
  //

  const calculatePercent = (data, countAll) => {
    var s = (data.smiling * 100) / countAll[0];
    var h = (data.happy * 100) / countAll[1];
    var n = (data.normal * 100) / countAll[2];
    var sa = (data.sad * 100) / countAll[3];
    var c = (data.cry * 100) / countAll[4];
    smiling.push(s);
    happy.push(h);
    normal.push(n);
    sad.push(sa);
    cry.push(c);
    console.log("smi...",smiling)
  };
  const countEachFeel = (data) => {
    var s = 0;
    var h = 0;
    var n = 0;
    var sa = 0;
    var c = 0;
    Object.values(data).map((week) => {
      s = s + week.count.smiling;
      h = h + week.count.happy;
      n = n + week.count.normal;
      sa = sa + week.count.sad;
      c = c + week.count.crying;
    });

    const countAll = [s, h, n, sa, c];
    calculatePercent(data.first.count, countAll);
    calculatePercent(data.second.count, countAll);
    calculatePercent(data.third.count, countAll);
    calculatePercent(data.forth.count, countAll);
    setBasy(false);
  };

  const getFeeling = async (month) => {
    try {
      setBasy(true);
      await fetch(`${API_URL}/user/feel-report?month=${month}`, {
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }).then(async (res) => {
        const { payload } = await res.json();
        smiling.push(0);
        happy.push(0);
        normal.push(0);
        sad.push(0);
        cry.push(0);
        console.log("payload", payload);
        countEachFeel(payload);
      });
    } catch {
      setBasy(false);
    }
  };
  useEffect(() => {
    const d = new Date();
    getFeeling(d.getMonth() + 1);
  }, []);
console.log("s..",smiling)
  return (
    <Row className={`p-0 m-0`}>
      <Card className={`${style.cardReport}`}>
        <Col className="col-2">
          <Form.Select
            onChange={(e) => {
              smiling.length=0
              happy.length=0
              normal.length=0
              sad.length=0
              cry.length=0
              console.log("value...", e.target.value);
              getFeeling(e.target.value);
            }}
            aria-label="Default select example"
          >
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="4">March</option>
            <option value="5">April</option>
            <option value="6">May</option>
            <option value="7">June</option>
            <option value="8">July</option>
            <option value="9">August</option>
            <option value="10">Sebtember</option>
            <option value="11">October</option>
            <option value="12">November</option>
          </Form.Select>
        </Col>
        {basy ? (
          "Loading..."
        ) : (
          <>
            <Line options={options} data={data} />
          </>
        )}
      </Card>
    </Row>
  );
};
export default CharReport;
