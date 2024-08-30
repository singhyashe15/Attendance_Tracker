import React from "react";
import FrameComponent from "./header";
import { NavLink } from "react-router-dom";
import './layout.css';
const web = () => {
  return (
    <>
      <div className='desktop2'>
      <FrameComponent />
      <div className='attendanceManagerLabel'>
            <div className='dashboardParent'>
              <div className='dashboard'>
                <h1 className='attendancemanager'>
                  <span>
                    <p className='attendancemanager1'>
                      A<sup>TTENDANCE</sup><sub>TRACKER</sub>
                    </p>
                    <p className='p'>{`    `}</p>
                  </span>
                </h1>
              </div>
              <NavLink to="/Dashboard" className='linktag' >
              <button className='enterDashboard'>
                  Enter into Dashboard
              </button>
              </NavLink>
            </div>
          <div className='copyright2024ByYashrajSingWrapper'>
            <i className='copyright2024By'>
              Made by Yashraj Singh
            </i>
          </div>
      </div>
    </div>
    </>
    
  )
  };

  export default web;
