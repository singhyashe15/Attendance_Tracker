import React, {  useCallback, useEffect, useState } from "react";
import  './dashboard.css';
import List from "./attendlist";
import SubDetail from "./Subject-details";


const Dashboard = ()=>{ 
  const [toggle,settoggle] = useState(false);

  const set = ()=>{
    settoggle(!toggle);
  }
  const [list,setlist] = useState([])
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

  const Set = useCallback((updateindex)=>{
    setlist(prevList => {
      const updatedList = updateindex; 
      return updatedList;
    });
  },[])
    
    const find=(id,val)=>{
      const new_items = list.map((li)=>{
          // for present class
        if(li.index === id && val === 0){
          return{
            ...li,present:String(Number(li.present) + 1),totalclass:String(Number(li.totalclass) + 1)
              }
        }
          // for absent class
        else if(li.index === id && val === 1){
          return{
            ...li,totalclass:String(Number(li.totalclass) + 1)
              }
        }
          // for deleting the particular subject
        else if(li.index === id && val === 2){
            // localStorage.removeItem(li)
          const updatelist = list.filter((li)=>li.index !== id);
          const updateindex = updatelist.map((li,index)=>({
              ...li,
              index:index
          }))
          
          Set(updateindex);
          return {}
        }
        else{
            return li
        }
      })
      if(val !== 2){
        Set(new_items)
        localStorage.setItem('list',JSON.stringify(new_items))
      }
    }
    const store = useCallback(()=>{
      const item = JSON.parse(localStorage.getItem("list"))
      setlist(item)
    },[])
    
    useEffect(()=>{
      store()
    },[toggle])   

    useEffect(()=>{
        localStorage.setItem("list",JSON.stringify(list))
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
        {list && list.map((li,index)=>{
          return(
            <List
              key = {index}
              id = {index}
              subject = {li.sub_name}
              present = {li.present}
              total = {li.totalclass}
              onSelect = {find}
            />
          )
        })}
      </div>
    </>
 )};

export default Dashboard;