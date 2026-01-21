import axios from "axios";

const api = "/api/v1";

export const fetchGitMenifest = async () => {
  try {
    const res = await axios.get(`${api}/providers/github/menifest`, {
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

export const fetchGitApps = async () => {
  try {
    const res = await axios.get(`${api}/providers/github/apps`, {
      withCredentials: true,
    });
    return res.data.apps;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw err;
  }
};

export const fetchGitRepos = async (appID: number) => {
  try {
    const res = await axios.get(`${api}/providers/github/repos/${appID}`, {
      withCredentials: true,
    });

    return res.data.repos;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw err;
  }
};

export const deleteGitApp = async (appID: number) => {
  try {
    const res = await axios.delete(`${api}/providers/github/delete/${appID}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw err;
  }
};
