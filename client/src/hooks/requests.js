const API_URL = 'http://localhost:8000/v1'



async function httpGetPlanets() {
 const response = await fetch(`${API_URL}/planets`)
 return response.json()
  // Load planets and return as JSON.
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`)
  const fetchedResponse = await response.json();
  return fetchedResponse.sort((a,b) =>{
    return a.flightnumber - b.flightnumber;
  })
  
}

 // Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method:"post",
      headers:{
        "Content-type": "Application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch(err){
    return{
      ok:false,
    }
  }

}
 

 // Delete launch with given ID.
async function httpAbortLaunch(id) {
  try{
    return await fetch(`${API_URL}/launches/${id}`,{
      method: "delete",
     })
  }catch(err){
     console.log(err)
     return{
      ok:false,
     };
  }
  
 
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};