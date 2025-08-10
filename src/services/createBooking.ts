import axios from 'axios';
import base_url from '../constants/urlEndpoint';
export const CreateBookingService = (bookingData: { show_id: number; seats: string[] }) => {
  const url = `${base_url}bookings`;
  return axios.post(url, bookingData);
};

export default CreateBookingService;