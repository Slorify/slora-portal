import TerminalConsole from "@/components/blocks/TerminalConsole";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { Play, RotateCcw, Square, UploadCloud } from "lucide-react";
import {
  deployInstance,
  startInstance,
  restartInstance,
  stopInstance,
  logsInstance,
} from "@/utils/instanceApi";
import { useEffect, useState } from "react";
import type { Iparams } from "../InstanceContent";

const AppConsole = ({ params }: { params: Iparams }) => {
  const { slug, islug } = params;
  const channel = `${slug}-${islug}`;
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    await logsInstance(`${slug}`, `${islug}`);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleDeploy = async () => {
    setLoading(true);
    await deployInstance(`${slug}`, `${islug}`);
    setLoading(false);
  };

  const handleStart = async () => {
    setLoading(true);
    await startInstance(`${slug}`, `${islug}`);
    setLoading(false);
  };

  const handleRestart = async () => {
    setLoading(true);
    await restartInstance(`${slug}`, `${islug}`);
    setLoading(false);
  };
  const handleStop = async () => {
    setLoading(true);
    await stopInstance(`${slug}`, `${islug}`);
    setLoading(false);
  };

  return (
    <div className="mx-auto flex w-full flex-col gap-5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            onClick={handleDeploy}
            disabled={loading}
            className="gap-2 font-bold"
          >
            <UploadCloud size={16} />
            Deploy
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleStart}
            disabled={loading}
            variant="secondary"
            className="gap-2"
          >
            <Play size={16} />
            Start
          </Button>

          <Button
            onClick={handleRestart}
            disabled={loading}
            variant="secondary"
            className="gap-2"
          >
            <RotateCcw size={16} />
            Restart
          </Button>

          <Button
            onClick={handleStop}
            disabled={loading}
            variant="destructive"
            className="gap-2"
          >
            <Square size={16} />
            Stop
          </Button>
        </div>
      </div>

      <TerminalConsole channel={channel} />
    </div>
  );
};

export default AppConsole;
