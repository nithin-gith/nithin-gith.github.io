import { useState } from "react";
import './styles/card.css';

function App() {
    const [place,setplace] = useState('');
    var [locData,setlocData] = useState(
      { name:"",
        region:"-",
        temp:"-",
        h_temp:"-",
        l_temp:"-",
        avg_temp:"-",
        desc:"",
        img_url:""
        });

  function changeCity(e){
    var city = e.target.value;
     setplace(city);
    }
  function handleClick(){
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=5763517a0030474991565608221102&q=${place}&days=1&aqi=no&alerts=no`)
    .then(responce => {

        responce.json().then(data=>{console.log(data);setlocData(
          { name:data.location.name,
            region:data.location.region,
            temp:data.current.temp_c,
            h_temp:data.forecast.forecastday[0].day.maxtemp_c,
            l_temp:data.forecast.forecastday[0].day.mintemp_c,
            avg_temp:data.forecast.forecastday[0].day.avgtemp_c,
            desc:data.forecast.forecastday[0].day.condition.text,
            img_url:data.forecast.forecastday[0].day.condition.icon
          })}) 
    }
    )
    .catch((error)=>console.log(error))
  }

  
  return (
    <div className="container ">
      <div className ="inner-container">
          <h1 className="heading">Weather Buddy</h1>
          <div className ="flex-column search-box">
            <input  className ="form-control search" type ="text" placeholder="Name of place" onChange={changeCity} />
            <button className="btn btn-primary search-button" onClick={handleClick} >Search</button>
          </div>
          <div>
                <p className="location">State: {locData.region}</p>
                <img src ={locData.img_url} alt=""></img>
                <p className="Bold">{locData.desc}</p>
                
                <p>Current Temperature : {locData.temp}</p>
                <p>Highest Temperature : {locData.h_temp}</p>
                <p>Lowest Temperature : {locData.l_temp}</p>
                <p>Average Temperature : {locData.avg_temp}</p>
          </div>
          
      </div>
    </div>
  );

}

export default App;

