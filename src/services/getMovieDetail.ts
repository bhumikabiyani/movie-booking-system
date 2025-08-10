import axios from 'axios';
import base_url from '../constants/urlEndpoint';

export const GetMovieByIdService = (movieId: string) => {
  const url = `${base_url}/movie?id=${movieId}`; 
  return axios.get(url);
};

export default GetMovieByIdService;