import React from "react";
import NavbarHeader from "../../component/header";
import TimeTable from "../../component/timeTable";
import AppBar from "../../layout/appBar";

const Home = () => {
  return (
    <AppBar>
      <TimeTable />
    </AppBar>
  );
};

export default Home;
