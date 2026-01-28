import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { IoFolderOpen } from "react-icons/io5";
import { MdMonitorHeart } from "react-icons/md";
import { SiTraefikproxy } from "react-icons/si";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../auth/useAuth";
import { FaGithubAlt } from "react-icons/fa6";

const homeItems = [
  { label: "Workspaces", to: "/dashboard/workspaces", icon: IoFolderOpen },
];

const settingsItems = [
  { label: "Proxy", to: "/dashboard/settings/proxy", icon: SiTraefikproxy },
  {
    label: "Monitoring",
    to: "/dashboard/settings/specs",
    icon: MdMonitorHeart,
  },
  {
    label: "Git Providers",
    to: "/dashboard/settings/gitapps",
    icon: FaGithubAlt,
  },
];

const AppSidebar = () => {
  const navigate = useNavigate();
  const { logout, loading } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <div
              onClick={() => navigate({ to: "/" })}
              className="cursor-pointer px-4 py-5 text-lg font-extrabold tracking-tight flex items-center gap-2"
            >
              <img width={35} src="/logo.png" alt="Slorify" />
              Slorify<span className="text-primary ml-1">Portal</span>
            </div>

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {/* HOME */}
                  <p className="text-muted-foreground text-xs mb-1">Home</p>
                  {homeItems.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <Link to={item.to} activeOptions={{ exact: true }}>
                        {({ isActive }) => (
                          <SidebarMenuButton
                            isActive={isActive}
                            tooltip={item.label}
                          >
                            <item.icon className="size-5" />
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                        )}
                      </Link>
                    </SidebarMenuItem>
                  ))}

                  {/* SETTINGS */}
                  <p className="text-muted-foreground text-xs mt-4 mb-1">
                    Settings
                  </p>
                  {settingsItems.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <Link to={item.to}>
                        {({ isActive }) => (
                          <SidebarMenuButton
                            isActive={isActive}
                            tooltip={item.label}
                          >
                            <item.icon className="size-5" />
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                        )}
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* FOOTER */}
          <SidebarFooter>
            <Button
              variant="secondary"
              onClick={logout}
              disabled={loading}
              className="w-full"
            >
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-hidden bg-background">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppSidebar;
