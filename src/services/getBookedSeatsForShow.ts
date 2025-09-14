import axios from 'axios';
import base_url from '../constants/urlEndpoint';


export const GetBookedSeatsForShowService = (showId: number) => {
  console.log("GetBookedSeatsForShowService called with showId:", showId);
  const url = `${base_url}getBookedSeatsForShow?show_id=${showId}`;
  console.log("Fetching booked seats from URL:", url);
  return axios.get(url);
};

export default GetBookedSeatsForShowService;