import { useState, type FormEvent } from "react";
import { useAuth } from "../auth/useAuth";
import Loading from "../components/Loading";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setUser((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(user);
    setUser({ email: "", password: "" });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center space-y-2">
      <h1 className="text-4xl text-base-content font-bold">
        Login back to account.
      </h1>
      <p className="text-base-content/80 mb-10 text-xl">
        welcome back log back in.
      </p>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset scale-120 bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            type="email"
            className="input"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <input
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
            className="input"
            placeholder="Password"
          />

          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary mt-4"
          >
            Login
          </button>
        </fieldset>
      </form>
    </main>
  );
};

export default Login;
