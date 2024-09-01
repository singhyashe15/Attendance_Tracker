import React, {  useEffect, useState } from "react";
import  './dashboard.css';
import List from "./attendlist";
import SubDetail from "./Subject-details";

const getLocalItems = ()=>{
  let lists = localStorage.getItem("list");
  console.log()
  if(lists)
   return  JSON.parse(localStorage.getItem("list"));
  else
    return [];
}

const Dashboard = ()=>{ 
  const [toggle,settoggle] = useState(false);

  const set = ()=>{
    settoggle(!toggle);
  }
  const [list,setlist] = useState(getLocalItems)
  const [percent,setpercent] = useState(0);
  const [date,setdate] = useState(0);
// TO get the current date 
  useEffect(()=>{
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
     
    let yyyy = today.getFullYear();
    if (dd < 10)
        dd = '0' + dd;
    if (mm < 10) 
        mm = '0' + mm;
    today = dd + '-' + mm + '-' + yyyy;
    setdate(today)
  },[]);

  // To calculate the percentage
  useEffect(()=>{
    let totalpresent = 0;
    let totalclass = 0;
    list.map((li) =>{
        totalpresent += Number(li.present)
        totalclass += Number(li.totalclass)
      return(<></>)
    });
    let totalpercent = (totalpresent/totalclass) * 100;
    if(totalpercent >= 0)
      setpercent(totalpercent.toFixed(2)); 
    else
      setpercent(0); 
  },[list])

  
    
    const find=(id,val)=>{
      console.log(`ID is ${id}`)
   const new_items = list.map((li)=>{
      if(li.index === id && val === 0){
          return{
        ...li,present:String(Number(li.present) + 1),total:String(Number(li.totalclass) + 1)
          }
      }
      else if(li.index === id && val === 1){
          return{
        ...li,total:String(Number(li.totalclass) + 1)
          }
      }
      else if(li.index === id && val === 2){
        // localStorage.removeItem(li.sub);
      const updatelist = list.filter((li)=>li.index !== id);
      const updateindex = updatelist.map((li,i)=>({
        ...li,
        index:i
      }))
      
      setlist(updateindex)
            return{}
      }
      else{
            return(
              li
            )
      }
      })
      if(val !== 2)
        setlist(new_items)
      
    }

    useEffect(()=>{
      console.log("Items" + JSON.stringify(list))
      localStorage.setItem('list',JSON.stringify(list))
    },[list])   

  return (
    <>
        <header className="header">
          <div className="left_view">
          <div>
          Total Attendance:{percent}%
          </div>
            <div>
          {date}
          </div>
          </div>
        </header>
        <section className="sub_details">
        <button className="Details" onClick={()=>set()}>
              Add Subject
            </button>
         { toggle &&   
            <SubDetail  onClose={()=>set()} />
          }
        </section>
       
        <div className="List" >
        {list.map((li,index)=>{
          return(
           <List
            key = {index}
            id = {index}
            subject = {li.sub}
            present = {li.present}
            total = {li.total}
            onSelect = {find}
           />
          )
        })}
        </div>
    </>
 )};

export default Dashboard;