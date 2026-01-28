import { useEffect, useState, useMemo } from "react";
import { getSocket } from "@/utils/socketConnect";

export type InstanceStatus =
  | "deploying"
  | "starting"
  | "running"
  | "restarting"
  | "stopped";

const STATUS_COLORS: Record<InstanceStatus, string> = {
  deploying: "blue-400",
  starting: "yellow-400",
  running: "green-400",
  restarting: "blue-200",
  stopped: "red-400",
};

const STATUS_FROM_COLORS: Record<InstanceStatus, string> = {
  deploying: "form-blue-400/60",
  starting: "from-yellow-400/60",
  running: "from-green-400/60",
  restarting: "from-blue-300/60",
  stopped: "from-red-400/60",
};

const STATUS_BG_COLORS: Record<InstanceStatus, string> = {
  deploying: "bg-blue-500",
  starting: "bg-yellow-500",
  running: "bg-green-500",
  restarting: "bg-blue-300",
  stopped: "bg-red-500",
};

export const useInstanceStatus = (instance: string) => {
  const [status, setStatus] = useState<InstanceStatus | null>(null);

  useEffect(() => {
    if (!instance) return;

    const socket = getSocket();
    const channel = `status-${instance}`;

    socket.emit("status:subscribe", instance);

    const handler = (data: { status: InstanceStatus }) => {
      setStatus(data.status);
    };

    socket.on(channel, handler);

    return () => {
      socket.off(channel, handler);
    };
  }, [instance]);

  const color = useMemo(
    () => (status ? STATUS_COLORS[status] : "text-muted-foreground"),
    [status],
  );
  const fromColor = useMemo(
    () => (status ? STATUS_FROM_COLORS[status] : "text-muted-foreground"),
    [status],
  );
  const bgColor = useMemo(
    () => (status ? STATUS_BG_COLORS[status] : "bg-muted/10"),
    [status],
  );

  const label = useMemo(
    () => (status ? status.toUpperCase() : "LOADING"),
    [status],
  );

  return {
    status,
    label,
    color,
    fromColor,
    bgColor,
  };
};
