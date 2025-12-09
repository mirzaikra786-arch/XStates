import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
//import { colors } from "@mui/material";

export default function SelectLocation(){

const [countries, setCountries]=useState([]);
const [cities, setCities]=useState([]);
const [states, setStates]=useState([]);
const [hasCountry, setHasCountry]=useState("");
const [hasState, setHasState]=useState("");
const [hasCity, setHasCity]= useState("");

useEffect(() => {
 axios.get("https://location-selector.labs.crio.do/countries")
 .then((response) => {
  setCountries(response.data);})
 .catch((error)=>{console.error("having error in fetching list of countries:", error);});
}, []);

useEffect(() => {
  if(hasCountry){
 axios.get(`https://location-selector.labs.crio.do/country=${hasCountry}/states`)
 .then((response)=>{
  setStates(response.data);
 setHasState("");
  setCities([]);
  setHasCity("");
 })
 .catch((error)=>{
  console.error("having error in fetching the list of states", error);
 });
}
}, [hasCountry]);

useEffect(() => {
 if (hasState && hasCountry){
  axios.get(`https://location-selector.labs.crio.do/country=${hasCountry}/state=${hasState}/cities`)
  .then((response)=>{
    setCities(response.data)
    setHasCity("");
  })
  .catch((error)=>{
    console.log("having error in fetching the list of cities", error);
  });
 } 
},[hasState, hasCountry]);
return(
<>
<select class="form-select form-select-lg mb-3" aria-label="Large select example" style={{
          margin:"10px",
          padding:"10px",
          width:"200px", 
        }} value={hasCountry}
        onChange={(e)=> setHasCountry(e.target.value)}>
  <option selected value={""} disabled>
    Select Country</option>
  {countries.map((country)=>(
 <option key={country} value={country}>
  {country}
  </option>
  ))}
</select>

<select class="form-select form-select-lg mb-3" aria-label="Large select example" style={{
  margin:"10px",
 padding:"10px",
 width:"200px", 
}} value={hasState}
onChange={(e)=> setHasState(e.target.value)}
disabled={!hasCountry}>
  <option selected value={""} disabled>Select State</option>
  {states.map((state)=>(
    <option key={state} value={state}>
      {state}
    </option>
  ))}
  </select>

<select class="form-select form-select-lg mb-3" aria-label="Large select example" style={{
   margin:"10px",
 padding:"10px",
 width:"200px",
}} value={hasCity}
onChange={(e)=> setHasCity(e.target.value)}
disabled={!hasState}>
  <option selected value={""} disabled>Select City</option>
  {cities.map((city) => (
    <option key={city} value={city}>
      {city}
    </option>
  ))}
 </select>
{hasCity && (
<h2>You selected <span style={{fontSize:"40px"}}>{hasCity}</span>,
  <span style={{color:"gray"}}>
    {" "} 
    {hasState}, {" "} {hasCountry}
  </span>
</h2>
)}
</>
    );
}

