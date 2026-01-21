import { useState } from "react";
import toast from "react-hot-toast";
import { PiPlus } from "react-icons/pi";

import Modal from "../blocks/Modal";
import { createWorkspace } from "../../utils/workspaceApi";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card } from "../ui/card";

type Props = {
  refresh: () => void;
};

const CreateWorkspaceDialog = ({ refresh }: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await toast.promise(createWorkspace({ name, description }), {
      loading: "Creating workspace...",
      success: (res) => res.message,
      error: (res) => res?.message || "Failed to create workspace",
    });

    setOpen(false);
    refresh();
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PiPlus className="mr-2 text-xl" />
        Create Workspace
      </Button>

      <Modal transparent open={open} onClose={() => setOpen(false)}>
        <Card className="w-[380px] p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h2 className="text-lg font-bold">Create Workspace</h2>
              <p className="text-sm text-muted-foreground">
                Enter workspace details below
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Workspace name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Workspace description"
                className="resize-none"
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

export default CreateWorkspaceDialog;
