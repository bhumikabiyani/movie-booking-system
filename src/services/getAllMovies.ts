import axios from 'axios';
import base_url from '../constants/urlEndpoint';
export const GetAllMoviesService = (language: string) => {
  const url = `${base_url}movies?language=${language}`;
  return axios.get(url);
};

export default GetAllMoviesService;