import { useEffect, useRef, useState } from "react";
import { getSocket } from "@/utils/socketConnect";

export type LogLevel = "info" | "warn" | "error";

export type LogSource =
  | "deploy"
  | "start"
  | "logs"
  | "restart"
  | "stop"
  | "system";

export type AppStatus =
  | "idle"
  | "deploying"
  | "starting"
  | "running"
  | "restarting"
  | "stopped";

export type LogMessage = {
  id: string;
  message: string;
  level: LogLevel;
  timestamp: string;
  source: LogSource;
  status: AppStatus;
  color: string;
};

const PREFIXES = ["deploy", "start", "logs", "restart", "stop"] as const;

const SOURCE_TO_STATUS: Record<LogSource, AppStatus> = {
  deploy: "deploying",
  start: "starting",
  logs: "running",
  restart: "restarting",
  stop: "stopped",
  system: "idle",
};

const STATUS_COLOR: Record<AppStatus, string> = {
  deploying: "text-orange-400",
  starting: "text-blue-400",
  running: "text-green-400",
  restarting: "text-purple-400",
  stopped: "text-red-400",
  idle: "text-muted-foreground",
};

export const useSocketLogs = (baseChannel: string) => {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [status, setStatus] = useState<AppStatus>("idle");

  const lastLogAt = useRef<number>(0);

  useEffect(() => {
    const socket = getSocket();
    const channels = PREFIXES.map((p) => `${p}-${baseChannel}`);

    const pushLog = (source: LogSource, payload: any) => {
      const nextStatus = SOURCE_TO_STATUS[source];
      const now = Date.now();

      lastLogAt.current = now;
      setStatus(nextStatus);

      setLogs((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          message: payload?.message ?? String(payload),
          level: payload?.level ?? "info",
          timestamp: new Date().toLocaleTimeString(),
          source,
          status: nextStatus,
          color: STATUS_COLOR[nextStatus],
        },
      ]);
    };

    const handlers = new Map<string, (p: any) => void>();

    channels.forEach((channel) => {
      const source = channel.split("-")[0] as LogSource;
      const handler = (payload: any) => pushLog(source, payload);

      handlers.set(channel, handler);
      socket.on(channel, handler);
    });

    socket.on("connect", () => {
      pushLog("system", { message: "Connected to log stream" });
    });

    socket.on("disconnect", () => {
      pushLog("system", {
        message: "Disconnected from log stream",
        level: "warn",
      });
    });

    const interval = setInterval(() => {
      if (!lastLogAt.current) return;
      if (Date.now() - lastLogAt.current > 15_000) {
        setStatus("idle");
      }
    }, 5_000);

    return () => {
      channels.forEach((c) => socket.off(c, handlers.get(c)));
      socket.off("connect");
      socket.off("disconnect");
      clearInterval(interval);
    };
  }, [baseChannel]);

  const clearLogs = () => setLogs([]);

  return {
    logs,
    status,
    clearLogs,
  };
};
