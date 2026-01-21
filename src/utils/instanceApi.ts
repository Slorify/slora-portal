import axios from "axios";

const api = "/api/v1";

interface Iinstance {
  name: string;
  type?: string;
  gitUrl?: string;
  enviorement?: { [key: string]: string };
  ports?: {
    external: string;
    internal: string;
  };
  domains?: {
    name: string;
    domain: string;
    port: string;
  };
}

export const getAllInstance = async (slug: string) => {
  const res = await axios.get(`${api}/workspace/${slug}/instance`, {
    withCredentials: true,
  });
  return res.data;
};

export const getInstance = async (slug: string, islug: string) => {
  try {
    const res = await axios.get(`${api}/workspace/testing/instance/test`, {
      withCredentials: true,
    });
    return res.data.instance;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw err;
  }
};

export const createInstance = async (slug: string, data: Iinstance) => {
  try {
    const res = await axios.post(`${api}/workspace/${slug}/instance`, data, {
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

export const updateInstance = async (slug: string, data: Iinstance) => {
  const res = await axios.put(`${api}/workspace/${slug}/instance`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const deployInstance = async (slug: string, islug: string) => {
  const res = await axios.post(
    `${api}/workspace/${slug}/instance/${islug}/deploy`,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const startInstance = async (slug: string, islug: string) => {
  const res = await axios.post(
    `${api}/workspace/${slug}/instance/${islug}/start`,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const stopInstance = async (slug: string, islug: string) => {
  const res = await axios.post(
    `${api}/workspace/${slug}/instance/${islug}/stop`,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const restartInstance = async (slug: string, islug: string) => {
  const res = await axios.post(
    `${api}/workspace/${slug}/instance/${islug}/restart`,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const logsInstance = async (slug: string, islug: string) => {
  const res = await axios.post(
    `${api}/workspace/${slug}/instance/${islug}/logs`,
    {
      withCredentials: true,
    },
  );
  return res.data;
};
