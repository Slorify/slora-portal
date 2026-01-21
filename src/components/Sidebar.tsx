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
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { FaGithubAlt } from "react-icons/fa6";

const homeItems = [
  { label: "Workspaces", to: "/dashboard/workspaces", icon: IoFolderOpen },
];

const settingsItems = [
  { label: "Proxy", to: "/dashboard/proxy", icon: SiTraefikproxy },

  { label: "Monitoring", to: "/dashboard/specs", icon: MdMonitorHeart },
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
              onClick={() => navigate("/")}
              className="cursor-pointer px-4 py-5 text-lg font-extrabold tracking-tight"
            >
              Ember<span className="text-primary"> Labs</span>
            </div>

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <p className="text-muted-foreground text-xs">Home</p>
                  {homeItems.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <NavLink to={item.to}>
                        {({ isActive }) => (
                          <SidebarMenuButton
                            isActive={isActive}
                            tooltip={item.label}
                          >
                            <item.icon className="size-5" />
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                        )}
                      </NavLink>
                    </SidebarMenuItem>
                  ))}

                  <p className="text-muted-foreground text-xs mt-4">Settings</p>
                  {settingsItems.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <NavLink to={item.to}>
                        {({ isActive }) => (
                          <SidebarMenuButton
                            isActive={isActive}
                            tooltip={item.label}
                          >
                            <item.icon className="size-5" />
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                        )}
                      </NavLink>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

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

        {/* Page content */}
        <main className="flex-1 overflow-hidden bg-background">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AppSidebar;
