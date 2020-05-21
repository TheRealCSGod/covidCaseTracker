import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if(country){
    changeableUrl = `${url}/countries/${country}`
  }
  try {
    // destructing to get data
    // we list the attribtutes we want to get back
    const {data: { confirmed, recovered, deaths, lastUpdate }} = await axios.get(changeableUrl);
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (e) {
    console.log(e)
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const dataToReturn = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      recovered: dailyData.recovered.total,
      date: dailyData.reportDate,
    }));
    return dataToReturn;
  } catch (e) {}
};

export const fetchCountries = async () => {
  try{
    const { data: {countries} } = await axios.get(`${url}/countries`)

    return countries.map((country) => country.name)
  }catch(e){

  }
}