import React from "react";
import {Routes,Route }from 'react-router-dom';
import Layout from './AttendanceWeb/layout';
import Dashboard from "./AttendanceWeb/Dashboard";

const App = ()=>{
  return(
    <>
      <Routes>
      <Route exact path = "/" element = {<Layout/>} />
      <Route exact path="/Dashboard" element ={<Dashboard/>} />
      </Routes>
    </>
  )
};

export default App;
