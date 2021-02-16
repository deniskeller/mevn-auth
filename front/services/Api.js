// import axios from 'axios';

const API_URL = 'http://localhost:4000/api/amigoweb';

// export const request = async ({ url, method, data = {} }) => {
//   const response = await axios[method](`${API_URL}/${url}`, data);
//   return response;
// }

export const request = async ({url, method, headers, data = {} }) => {
  const response = await fetch(`${API_URL}/${url}`, {
    method: method,
    headers: {
      'Content-Type': headers
    },
    body: JSON.stringify(data)
  });
  
  const responseData = await response.json();

  if(!response.ok) {
    throw new Error(responseData.message || "Что-то пошло не так")
  }
  return responseData;
}