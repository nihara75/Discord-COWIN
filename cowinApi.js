

const axios = require("axios");

headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
};


const getState = async () => {
    url = "https://cowin.rabeeh.me/api/v2/admin/location/states";
    let result = await axios.get(url);
    //console.log(result.data.data);
    return result.data.data;
  };
  const getDistricts = async (state_id) => {
    url = `https://cowin.rabeeh.me/api/v2/admin/location/districts/${state_id}`;
    let result = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
      },
    });
    return result.data.data;
  };
  const getSlots = async (district_id, date) => {
    url = `https://cowin.rabeeh.me/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`;
    let result = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
      },
    });
    return result.data.data;
  };
  
module.exports = { getState, getDistricts, getSlots };
