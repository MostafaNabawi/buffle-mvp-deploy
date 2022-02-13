import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { Icon } from '@iconify/react';
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
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Percent",
      },
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
};

const labels = ["", "1 Week", "2 Week", "3 Week", "4 Week"];

const CharReport = () => {
  const [basy, setBasy] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("");
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
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.6,
      },
      {
        label: "Smiling",
        data: smiling,
        borderColor: "rgb(238,180,21)",
        backgroundColor: "rgba(238,180,21, 0.5)",
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.9,
      },
      {
        label: "Normal",
        data: normal,
        borderColor: "rgb(122,252,67)",
        backgroundColor: "rgba(122,252,67, 0.5)",
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.8,
      },
      {
        label: "Sad",
        data: sad,
        borderColor: "rgb(52,109,139)",
        backgroundColor: "rgba(52,109,139, 0.5)",
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.7,
      },
      {
        label: "Crying",
        data: cry,
        borderColor: "rgb(25,55,105)",
        backgroundColor: "rgba(25,55,105, 0.5)",
        fill: false,
        cubicInterpolationMode: "monotone",
        tension: 0.5,
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
        countEachFeel(payload);
      });
    } catch {
      setBasy(false);
    }
  };
  useEffect(() => {
    const d = new Date();
    setCurrentMonth(d.getMonth() + 1);
    getFeeling(d.getMonth() + 1);
  }, []);
  
  return (
    <Row className={`p-0 m-0`}>
      <Card className={`${style.cardReport}`}>
        <Col className="col-2">
          <Form.Select
            onChange={(e) => {
              if (e.target.value != "0") {
                smiling.length = 0;
                happy.length = 0;
                normal.length = 0;
                sad.length = 0;
                cry.length = 0;
                getFeeling(e.target.value);
              }
            }}
            aria-label="Default select example"
          >
            <option value="1" selected={currentMonth === 1 ? true : false}>
              January
            </option>
            <option value="2" selected={currentMonth === 2 ? true : false}>
              February
            </option>
            <option value="3" selected={currentMonth === 3 ? true : false}>
              March
            </option>
            <option value="4" selected={currentMonth === 4 ? true : false}>
              April
            </option>
            <option value="5" selected={currentMonth === 5 ? true : false}>
              May
            </option>
            <option value="6" selected={currentMonth === 6 ? true : false}>
              June
            </option>
            <option value="7" selected={currentMonth === 7 ? true : false}>
              July
            </option>
            <option value="8" selected={currentMonth === 8 ? true : false}>
              August
            </option>
            <option value="0" selected={currentMonth === 0 ? true : false}>
              Sebtember
            </option>
            <option value="10" selected={currentMonth === 10 ? true : false}>
              October
            </option>
            <option value="11" selected={currentMonth === 11 ? true : false}>
              November
            </option>
            <option value="12" selected={currentMonth === 12 ? true : false}>
             December
            </option>
          </Form.Select>
        </Col>
        {basy ? (
          <div className="text-center pt-5 mt-5 pb-5 mb-5">
            <Icon fontSize={44} icon="eos-icons:bubble-loading" />
          </div>
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
