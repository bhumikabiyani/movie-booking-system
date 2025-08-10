import axios from "axios";
import base_url from "../constants/urlEndpoint";

export const GetTicketService = async (bookingId: number) => {
  const url = `${base_url}/getBookingById?id=${bookingId}`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default GetTicketService;