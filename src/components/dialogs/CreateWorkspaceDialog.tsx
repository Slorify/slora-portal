import { useState } from "react";
import Modal from "../blocks/Modal";
import { PiPlus } from "react-icons/pi";
import toast from "react-hot-toast";
import { createWorkspace } from "../../utils/workspaceApi";

type Props = {
  refresh: () => void;
};

const CreateWorkspaceDialog = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await toast.promise(createWorkspace({ name, description }), {
      loading: "Creating workspace...",
      success: (res) => res.message,
      error: (res) => res.message,
    });
    setOpen(false);
    props.refresh();
  };
  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-primary">
        <PiPlus className="text-2xl font-bold" />
        Create Workspace
      </button>
      <Modal transparent open={open} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset scale-120 bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Page details</legend>

            <label className="label">Name</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              className="input"
              required
              placeholder="Enter workspace name."
            />

            <label className="label">Description</label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="textarea resize-none"
              placeholder="Enter your workspace description."
            />
            <div className="mx-auto space-x-6">
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="btn btn-neutral"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </fieldset>
        </form>
      </Modal>
    </>
  );
};

export default CreateWorkspaceDialog;
