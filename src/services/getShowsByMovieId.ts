import axios from 'axios';
import base_url from '../constants/urlEndpoint';

export const GetShowsByMovieIdService = (movieId: string) => {
  const url = `${base_url}/getShowsByMovieId?movie_id=${movieId}`; 
  return axios.get(url);
};

export default GetShowsByMovieIdService;