import axios from 'axios';

const API_URL = 'http://localhost:4000/api/amigoweb';

export const request = async ({ url, method, data = {} }) => {
  console.log('data: ', data);
  const response = await axios[method](`${API_URL}/${url}`, data);
  return response;
} 