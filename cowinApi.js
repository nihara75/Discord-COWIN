

const axios = require("axios");

headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
};


/*const getState = () => {

  return new Promise((resolve,reject)=>{

    url = "https://cowin.rabeeh.me/api/v2/admin/location/states";
     axios.get(url,function(err,result){

      if(err||!result.data.data)
      resolve(0);
    else
      resolve(result.data.data)
    
		
		
		
			
			
  }),(error)=>(reject(error));
});
	
  };*/
  
 const getState = async () => {
   try{
    url = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
    let result = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
      },
    });
    return result.data;}catch(err){console.log(err)};
  };


    
  const getDistricts = async (state_id) => {
    url = "https://cowin.rabeeh.me/api/v2/admin/location/districts/${state_id}";
    
    let result = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
      },
    });
    return result.data;
  };
  const getSlots = async (district_id, date) => {
    try{
      url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+district_id+"&date="+date;
    let result = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
      },
    });
    
    return result.data;
    }catch(err){console.log(err);}
    
  };
  
module.exports = { getState, getDistricts, getSlots };
