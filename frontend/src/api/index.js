import axios from 'axios';

const api = async (method, rota, data) => {
  const baseURL = process.env.BASE_URL || 'http://localhost:3001';

  let response;
  switch (method) {
    case 'get':
      response = await axios.get(`${baseURL}${rota}`);
      break;
    case 'post':
      response = await axios.post(`${baseURL}${rota}`, data);
      break;
    case 'put':
      response = await axios.put(`${baseURL}${rota}`, data);
      break;
    case 'delete':
      response = await axios.delete(`${baseURL}${rota}`);
      break;
    default:
      throw new Error('Método inválido');
  }
  return response;
};

export default api;
