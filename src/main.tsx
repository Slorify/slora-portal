import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Toaster } from "react-hot-toast";
import { Check, X, Loader2, Info } from "lucide-react";

import AuthProivder from "./auth/AuthProivder";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />

    <Toaster
      position="bottom-center"
      gutter={12}
      toastOptions={{
        duration: 4000,
        className:
          "group flex w-full max-w-md items-start gap-3 rounded-md border px-4 py-3 shadow-sm backdrop-blur",
        style: {
          background: "var(--popover)",
          color: "var(--foreground)",
          borderColor: "var(--border)",
        },
        success: {
          icon: <Check className="h-4 w-4 stroke-[2.5] text-emerald-500" />,
          className:
            "border-l-4 border-l-emerald-500/70 text-emerald-600 dark:text-emerald-400",
        },
        error: {
          icon: <X className="h-4 w-4 stroke-[2.5] text-rose-500" />,
          className:
            "border-l-4 border-l-rose-500/70 text-rose-600 dark:text-rose-400",
        },
        loading: {
          icon: (
            <Loader2 className="h-4 w-4 animate-spin stroke-[2.5] text-primary" />
          ),
          className: "border-l-4 border-l-primary/70 text-primary",
        },
        blank: {
          icon: <Info className="h-4 w-4 stroke-[2.5] text-muted-foreground" />,
          className: "border-l-4 border-l-muted text-foreground",
        },
      }}
    />
  </StrictMode>,
);
