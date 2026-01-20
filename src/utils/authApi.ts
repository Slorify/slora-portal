import axios from "axios";

const api = "/api/v1";

export interface IAuthRegister {
  firstname?: string;
  lastname?: string;
  username: string;
  email: string;
  password: string;
}
interface BaseAuth {
  password: string;
}

export type IAuthLogin =
  | (BaseAuth & { email: string; username?: never })
  | (BaseAuth & { username: string; email?: never });

export const registerAuth = async (user: IAuthRegister) => {
  try {
    const res = await axios.post(`${api}/auth/register`, user);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw err;
  }
};

export const loginAuth = async (user: IAuthLogin) => {
  try {
    const res = await axios.post(`${api}/auth/login`, user, {
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

export const logoutAuth = async () => {
  try {
    const res = await axios.post(`${api}/auth/logout`, {
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

export const getMeAuth = async () => {
  try {
    const res = await axios.get(`${api}/auth/me`, {
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
