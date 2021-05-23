const fetch = require("node-fetch-with-proxy");
const HttpsProxyAgent = require("https-proxy-agent");

const axios = require("axios");

headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
};
const proxyAgent = new HttpsProxyAgent("http://14.99.187.7:80");

const fetchState = async () => {
    url = "https://cowin.rabeeh.me/api/v2/admin/location/states";
    let result = await axios.get(url);
    //console.log(result.data.data);
    return result.data.data;
  };
  const fetchDistricts = async (state_id) => {
    url = `https://cowin.rabeeh.me/api/v2/admin/location/districts/${state_id}`;
    let result = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
      },
    });
    return result.data.data;
  };
  const fetchSlots = async (district_id, date) => {
    url = `https://cowin.rabeeh.me/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`;
    let result = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
      },
    });
    return result.data.data;
  };
  
module.exports = { fetchState, fetchDistricts, fetchSlots };
