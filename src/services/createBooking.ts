import axios from 'axios';
import base_url from '../constants/urlEndpoint';

export const CreateBookingService = (bookingData: { show_id: number; seats: string[] }) => {
  const url = `${base_url}bookings`;
  console.log("CreateBookingService called with data:", bookingData);
  console.log("Posting booking to URL:", url);
  return axios.post(url, bookingData);
};

export default CreateBookingService;