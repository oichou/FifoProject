import axios from 'axios';

const API_BACK_BASE_URL = 'http://localhost:9000/api';

export const getActions = async () => {
  try {
    const response = await axios.get(`${API_BACK_BASE_URL}/actions`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAction = async (action: string) => {
  try {
    const response = await axios.post(`${API_BACK_BASE_URL}/actions`, { type: action });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const executeAction = async () => {
  try {
    const response = await axios.get(`${API_BACK_BASE_URL}/actions/execute`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
