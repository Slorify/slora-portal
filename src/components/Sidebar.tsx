import { IoFolderOpen } from "react-icons/io5";
import { MdMonitorHeart } from "react-icons/md";
import { SiTraefikproxy } from "react-icons/si";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const sidebarItems = [
  {
    label: "Workspaces",
    to: "/dashboard/workspaces",
    icon: IoFolderOpen,
  },
  {
    label: "Proxy",
    to: "/dashboard/proxy",
    icon: SiTraefikproxy,
  },
  {
    label: "Monitoring",
    to: "/dashboard/specs",
    icon: MdMonitorHeart,
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, loading } = useAuth();
  return (
    <div className="flex w-full h-screen">
      <aside className="flex flex-col justify-start py-5 h-full md:w-40 w-20 lg:w-60 border-r border-base-200 bg-base-300">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="px-6 py-4 text-xl font-semibold"
        >
          Ember<span className="text-primary md:inline hidden "> Labs</span>
        </div>

        {/* Navigation */}
        <nav className="px-3 flex flex-col justify-between items-start h-full">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `
                  flex items-start gap-3 rounded-md md:pl-4 p-4 md:pr-18 py-2
                  text-sm font-medium transition
                  ${isActive
                      ? "bg-primary text-primary-content"
                      : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                    }
                `
                  }
                >
                  <item.icon className="text-lg " />
                  <span className=" md:block hidden">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            onClick={logout}
            disabled={loading}
            className="btn btn-primary self-center"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
