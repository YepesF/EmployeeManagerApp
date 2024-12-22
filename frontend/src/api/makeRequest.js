import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL;

if (!url) {
  throw new Error('La variable de entorno VITE_BACKEND_URL no está definida.');
}

export async function makeRequest(endpoint, method, headers, body = {}) {
  try {
    const response = await axios({
      method,
      url: `${url}${endpoint}`,
      headers,
      data: body,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data?.message || 'Algo salió mal';
      throw new Error(errorMessage);
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor.');
    } else {
      throw new Error(error.message || 'Error desconocido');
    }
  }
}
