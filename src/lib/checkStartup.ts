import axios from "axios";
const api = "/api/v1";

interface StartupResponse {
  success: boolean;
  done: boolean;
  config: Record<string, any> | null;
  message: string;
}

interface StartupRequest {
  email: string;
  proxyMode: string;
  domain?: string;
  port?: number;
  swarmMode: boolean;
}

export const checkStartup = async (): Promise<StartupResponse | null> => {
  try {
    const res = await axios.get<StartupResponse>(`${api}/startup/check`);
    return res.data;
  } catch (err) {
    return null;
  }
};

export const writeStartup = async (
  data: StartupRequest,
): Promise<StartupResponse | null> => {
  try {
    const res = await axios.post<StartupResponse>(`${api}/startup/write`, data);
    return res.data;
  } catch (err: any) {
    return {
      success: false,
      done: false,
      message: err.response?.data?.message || err.message,
      config: null,
    };
  }
};
