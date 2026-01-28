import { createFileRoute } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad(ctx) {
    redirect({ to: "/dashboard/workspaces" });
  },
});
