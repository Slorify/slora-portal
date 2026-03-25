import * as React from "react";
import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";
import TopLoader from "@/components/TopLoader";
import AuthProivder from "@/auth/AuthProivder";
import { verifySession } from "@/auth/verifyAuth";
import { checkStartup } from "@/lib/checkStartup";

export const Route = createRootRoute({
  async beforeLoad({ location }) {
    const authPaths = ["/login", "/register"];
    const isAuthenticated = await verifySession();
    if (location.pathname === "/") {
      throw redirect({ to: "/dashboard/workspaces" });
    }

    if (authPaths.includes(location.pathname)) {
      if (!isAuthenticated) {
        const check = await checkStartup();
        if (check?.done == false) {
          throw redirect({ to: "/startup" });
        }
      }
      if (isAuthenticated) {
        throw redirect({ to: "/dashboard/workspaces" });
      }
      return;
    }

    if (
      location.pathname === "/dashboard" ||
      location.pathname.startsWith("/dashboard/")
    ) {
      if (!isAuthenticated) {
        throw redirect({ to: "/login" });
      }
    }
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <AuthProivder>
        <TopLoader />
        <Outlet />
      </AuthProivder>
    </React.Fragment>
  );
}
