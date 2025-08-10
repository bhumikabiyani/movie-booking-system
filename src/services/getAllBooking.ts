import axios from 'axios';
import base_url from '../constants/urlEndpoint';
export const GetAllBookingsService = () => {
  const url = `${base_url}getAllBookings`;
  return axios.get(url);
};

export default GetAllBookingsService;