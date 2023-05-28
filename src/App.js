import React, { useEffect, useState } from "react";
import Table from "./Table";
import wine from './wine.json'

function App() {
  const [state,setState]=useState("Flavanoids")
  const [array,setArray]=useState(wine)
  const handleTable = ()=>{
    if(state==="Flavanoids"){
      setState("Gamma")
    }else{
      setState("Flavanoids")
    }
  }
  useEffect(()=>{
    let data = [...array]
    data=data.map((item)=>{
      return{
        ...item,
        Gamma:(item.Ash * item.Hue) / item.Magnesium
      }
    })
    setArray([...data])
  },[])
  var groupedData = array.reduce(function(result, current) {
    var category = current?.Alcohol;
    
    if (!result[category]) {
      result[category] = [];
    }
    
    result[category].push(current);
    
    return result;
  }, {});
  return (
    <div className="center">
    <h1>{state}</h1>
    {
      state==="Flavanoids"?
      <Table groupedData={groupedData} property="Flavanoids"/>
      :
      <Table groupedData={groupedData} property="Gamma"/>
    }
    <button onClick={()=>handleTable()}>Change to {state==="Flavanoids"?"Gamma":"Flavanoids"}</button>
    </div>
  );
}

export default App;