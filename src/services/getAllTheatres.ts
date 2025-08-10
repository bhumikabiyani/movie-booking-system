import axios from "axios";
import base_url from "../constants/urlEndpoint";
export const GetAllTheatresService = (location: string) => {
  const url = `${base_url + "theatres"}?location=${location}`;
  return axios.get(url);
};

export default GetAllTheatresService;
