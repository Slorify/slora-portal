import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSocketLogs } from "@/hooks/useSocketLogs";

const TerminalConsole = ({ channel }: { channel: string }) => {
  const { logs, clearLogs } = useSocketLogs(channel);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <Card className="w-full bg-black text-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-neutral-900 px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          Terminal
        </span>
        <Button
          size="sm"
          variant="default"
          onClick={clearLogs}
          className="h-6 px-2 text-xs"
        >
          Clear
        </Button>
      </CardHeader>

      <CardContent className="max-h-90 overflow-scroll p-4 font-mono">
        {logs.map((log) => (
          <div
            key={log.id}
            className={cn(
              "whitespace-pre-wrap leading-relaxed",
              log.color,
              log.level === "warn" && "opacity-80",
              log.level === "error" && "font-semibold",
            )}
          >
            <span className="mr-2 text-gray-500">[{log.timestamp}]</span>

            <span className="mr-2 font-semibold opacity-80">
              [{log.status.toUpperCase()}]
            </span>

            {log.message}
          </div>
        ))}

        <div ref={bottomRef} />
      </CardContent>
    </Card>
  );
};

export default TerminalConsole;
