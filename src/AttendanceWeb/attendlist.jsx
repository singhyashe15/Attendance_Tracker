import React from "react";

import {FaTrash} from "react-icons/fa"

const List=(props)=>{
  return(
        <div className="attend">
          <span className="subname">Subject : {props.subject}</span>
          <span className="daylist day1">Present:{props.present}</span>
          <span className="daylist">Absent:{Number(props.total) - Number(props.present)}</span>
          <span className="daylist">Total Classes:{props.total}</span>
         <div className="count">
         <div>
         <button 
              onClick={()=>{props.onSelect(props.id,0)}} 
              className="present">Pr
          </button>
         </div>

         <div>
         <button 
              onClick={()=>{props.onSelect(props.id,1)}} 
              className="absent">
            Ab
          </button>
         </div>

         <div>
         <button 
                className="delete" 
                onClick={()=>{props.onSelect(props.id,2)}} >
                <FaTrash/>
        </button>
         </div>
         </div> 
            </div>
  )
};


export default List;