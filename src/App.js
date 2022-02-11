import { useState } from "react";



function App() {
    const [place,setplace] = useState('anantapur');
    var [locData,setlocData] = useState({name:"",temp:""});

  function changeCity(e){
    var city = e.target.value;
     setplace(city);
    }
  function handleClick(){
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=5763517a0030474991565608221102&q=${place}&days=1&aqi=no&alerts=no`)
    .then(responce => {
      if(!responce.ok){
        alert("no city found")
      }
      else{

        responce.json().then(data=>{console.log(data);setlocData({temp:data.current.temp_c,name:data.location.name})})
      }
    }
    )
  }


  
  return (
    <div className="App">
      
        <input placeholder="Name of place" onChange={changeCity} />
        <button onClick={handleClick} >Search</button>
      
      <h1>i live in {locData.name},{locData.temp}</h1>

    </div>
  );

}

export default App;
