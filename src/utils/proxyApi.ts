import axios from "axios";

const api = "/api/v1";

export const installProxy = async () => {
  try {
    const res = await axios.post(`${api}/proxy/install`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw err;
  }
};

export const startProxy = async () => {
  try {
    const res = await axios.post(`${api}/proxy/start`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw err;
  }
};

export const stopProxy = async () => {
  try {
    const res = await axios.post(`${api}/proxy/stop`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw err;
  }
};

export const logsProxy = async () => {
  try {
    const res = await axios.post(`${api}/proxy/logs`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw err;
  }
};
