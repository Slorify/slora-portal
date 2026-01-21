import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import "./index.css";
import Workspace from "./pages/dashboard/workspaces/$slug";
import Workspaces from "./pages/dashboard/workspaces";
import InstancePage from "./pages/dashboard/instances/InstancePage";
import AppSidebar from "./components/Sidebar";
import GitProviderPage from "./pages/GitProviderPage";

const App = () => {
  return (
    <main className="flex min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route element={<ProtectedRoutes invert redirectUrl="/dashboard" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<div>Register</div>} />
        </Route>

        <Route element={<ProtectedRoutes redirectUrl="/login" />}>
          <Route element={<AppSidebar />}>
            <Route path="/dashboard">
              <Route index element={<Navigate to="workspaces" replace />} />
              <Route path="workspaces" element={<Workspaces />} />
              <Route path="workspaces/:slug" element={<Workspace />} />
              <Route
                path="workspaces/:slug/:islug"
                element={<InstancePage />}
              />
              <Route path="user" element={<div>User</div>} />

              <Route path="settings">
                <Route path="gitapps" element={<GitProviderPage />} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
