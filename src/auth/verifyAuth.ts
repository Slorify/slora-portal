import { getMeAuth } from "@/utils/authApi";

export const verifySession = async () => {
  try {
    const user = await getMeAuth();
    return user;
  } catch {
    return null;
  }
};
