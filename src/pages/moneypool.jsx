import { React } from "react";
import { Outlet } from "react-router-dom";
import Card from "./../components/card/Card";
import CardHeader from "./../components/card/CardHeader";

const Moneypool = () => {
  return (
    <Card className="event_card">
      <CardHeader title="BD" />
      <Outlet />
    </Card>
  );
};

export default Moneypool;
