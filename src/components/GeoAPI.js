import axios from "axios";

async function GeoAPI(values) {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: { q: `${values.latitude},${values.longitude}` },
    headers: {
      "X-RapidAPI-Key": "677fa8ef55msh12c799620d55df4p13296djsn3a8a9901fac2",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.error(error);
    var res = { message: "internal server error", status: 500 };
    return res;
  }
}

export default GeoAPI;
