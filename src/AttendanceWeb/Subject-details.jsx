import React, { useEffect, useState } from "react";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./subject.css"


const getLocalItems = ()=>{
  let lists = localStorage.getItem("list");

  if(lists)
   return  JSON.parse(localStorage.getItem("list"));
  else
    return [];
}

const SubDetail = ({onClose})=>{
  const [sub,setsub] = useState({sub_name:'',present:'',totalclass:''})
  const [list,setlist] = useState(getLocalItems)
  const regex = /[a-zA-Z]/;

  const add = (e) =>{
    const {name,value} = e.target
    setsub((prev)=>{
      return{
        ...prev,
        [name] : value
      }}
    )
  }

  const notifywarn = ()=>{
    toast("Total class cannot be less than present class")
  }
  const notifynegative = ()=>{
    toast("classes count cannnot be less than or equal to 0")
  }
  const notifyalpha = ()=>{
    toast("class cannot contain alphabet")
  }
  const notifymiss = ()=>{
    toast("Fill all the data")
  }


  const show = ()=>{
    const newINdex = list.length > 0 ? list[list.length - 1].index + 1 : 0;
    if(sub.sub_name !== "null" && sub.totalclass > 0 && sub.present > 0 && sub.totalclass >= sub.present){
      setlist((prev)=>[
        ...prev,{
          sub_name: sub.sub_name,
          present:sub.present,
          totalclass:sub.totalclass,
          index:newINdex
        }
      ])
      setTimeout(()=>{
        onClose();
      },2000)
    }
    else if(sub.totalclass < sub.present && !regex.test(sub.totalclass) && !regex.test(sub.present)){
      notifywarn();
    }
    else if (sub.totalclass < 0 || sub.present < 0){
      notifynegative();
    }
    else if(regex.test(sub.totalclass) || regex.test(sub.present) )
      notifyalpha();
    else
      notifymiss();
  }

  useEffect(()=>{
     localStorage.setItem("list",JSON.stringify(list))
  },[list])

  return (
    <div className="sec">
          <div className="add_sub">
            <div className="details details1">
            <span className="Sub">
              Subject Name:
            </span>
            <input 
                placeholder="Eg.Mathematics" 
                name = "sub_name" 
                value={sub.sub_name} 
                onChange={add} 
                autoComplete="off"  
                required="required"/>
            </div>
            <div  className="details">
            <span className="Sub">
              Present:
            </span>
            <input 
                placeholder="0" 
                name="present" 
                value={sub.present} 
                onChange={add} 
                autoComplete="off" 
                required/>
            </div>
            <div  className="details">
            <span className="Sub">
              Total classes:
            </span>
            <input 
                placeholder="0" 
                name="totalclass" 
                value={sub.totalclass} 
                onChange={add} 
                autoComplete="off"  
                required/>
            </div>
            <div className="details_add">
            <button 
                className="add"
                onClick={show} 
                >
              Submit
            </button>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={true}
              newestOnTop={true}
              rtl={true}
              closeButton={false} 
              toastStyle={{
                backgroundColor:'#333',
                color:'#fff',
                fontStyle:'italic',
                fontSize:'1.2rem',
                borderRadius:'50px',
                width:'20rem',
                textAlign:'center',
                marginTop:'1rem',
                marginLeft:'4rem'
              }}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <button className="add" onClick={onClose}>
              Cancel
            </button>
            </div>
          </div>
            </div>
  )
}

export default SubDetail;