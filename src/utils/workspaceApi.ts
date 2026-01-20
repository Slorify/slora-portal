import axios from "axios";

const api = "/api/v1";

export interface Iworkspace {
  name: string;
  description: string;
}

export const getAllWorkspaces = async () => {
  try {
    const res = await axios.get(`${api}/workspace`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw err;
  }
};

export const getWorkspace = async (slug: string) => {
  const res = await axios.get(`${api}/workspace/${slug}`, {
    withCredentials: true,
  });
  return res.data;
};

export const createWorkspace = async (data: Iworkspace) => {
  try {
    const res = await axios.post(`${api}/workspace/create`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw err;
  }
};

export const updateWorkspace = async (data: Iworkspace) => { };

export const deleteWorkspace = async (slug: string) => {
  try {
    const res = await axios.delete(`${api}/workspace/${slug}/delete`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw err;
  }
};
