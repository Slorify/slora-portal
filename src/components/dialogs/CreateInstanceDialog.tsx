import { useState } from "react";
import { PiPlus } from "react-icons/pi";
import toast from "react-hot-toast";

import Modal from "../blocks/Modal";
import { createInstance } from "../../utils/instanceApi";
import { parseEnvToJson } from "../../utils/parseEnv";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  slug: string;
  refresh: () => void;
};

const CreateInstanceDialog = ({ slug, refresh }: Props) => {
  const [open, setOpen] = useState(false);
  const [instance, setInstance] = useState({
    name: "",
    type: "Railpacks",
    envText: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enviorement = parseEnvToJson(instance.envText);

    await toast.promise(
      createInstance(slug, {
        name: instance.name,
        type: instance.type,
        enviorement,
      }),
      {
        loading: "Creating instance...",
        success: (res) => res.message,
        error: (err) => err?.message || "Failed to create instance",
      },
    );

    refresh();
    setOpen(false);
    setInstance({
      name: "",
      type: "Railpacks",
      envText: "",
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PiPlus className="mr-2 text-xl" />
        Create Instance
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} transparent>
        <Card className="w-[420px] p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h2 className="text-lg font-bold">Create Instance</h2>
              <p className="text-sm text-muted-foreground">
                Configure your instance details
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={instance.name}
                onChange={(e) =>
                  setInstance((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Enter instance name..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={instance.type}
                onValueChange={(value) =>
                  setInstance((p) => ({ ...p, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select instance type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Railpacks">Application</SelectItem>
                  <SelectItem value="Dockerfile">Dockerfile</SelectItem>
                  <SelectItem value="Static">Static</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="env">Env Variables</Label>
              <Textarea
                id="env"
                value={instance.envText}
                onChange={(e) =>
                  setInstance((p) => ({ ...p, envText: e.target.value }))
                }
                placeholder="NODE=production"
                className="h-24 resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Card>
      </Modal>
    </>
  );
};

export default CreateInstanceDialog;
