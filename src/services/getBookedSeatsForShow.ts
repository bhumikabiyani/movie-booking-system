import axios from 'axios';
import base_url from '../constants/urlEndpoint';


export const GetBookedSeatsForShowService = (showId: number) => {
  const url = `${base_url}/getBookedSeatsForShow?show_id=${showId}`; 
  return axios.get(url);
};

export default GetBookedSeatsForShowService;