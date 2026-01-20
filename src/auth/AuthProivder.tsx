import { useEffect, useState } from "react";
import type { AuthUser } from "../types/auth";
import {
  getMeAuth,
  loginAuth,
  logoutAuth,
  registerAuth,
  type IAuthLogin,
  type IAuthRegister,
} from "../utils/authApi";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const AuthProivder = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = !!user;

  const refresh = async () => {
    try {
      setLoading(true);
      const data = await getMeAuth();
      setUser(data);
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const login = async (data: IAuthLogin) => {
    setLoading(true);
    try {
      const res = await loginAuth(data);
      toast.success(res.message);
      await refresh();
      navigate("/dashboard/workspaces");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const register = async (data: IAuthRegister) => {
    setLoading(true);
    try {
      const res = await registerAuth(data);
      toast.success(res.message);
      await refresh();
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await logoutAuth();
      toast.success(res.message);
      setUser(null);
      await refresh();
      navigate("/login");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        refresh,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProivder;
