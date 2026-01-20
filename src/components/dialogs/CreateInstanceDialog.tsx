import { useState } from "react";
import { PiPlus } from "react-icons/pi";
import { createInstance } from "../../utils/instanceApi";
import Modal from "../blocks/Modal";
import toast from "react-hot-toast";
import { parseEnvToJson } from "../../utils/parseEnv";

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
        error: (err) => err.message,
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
      <button onClick={() => setOpen(true)} className="btn btn-primary">
        <PiPlus className="text-2xl font-bold" />
        Create Instance
      </button>

      <Modal open={open} onClose={() => setOpen(false)} transparent>
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset scale-120 bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Instance Details</legend>

            {/* Name */}
            <label className="label">Name</label>
            <input
              value={instance.name}
              onChange={(e) =>
                setInstance((p) => ({ ...p, name: e.target.value }))
              }
              type="text"
              required
              className="input"
              placeholder="Enter instance name..."
            />

            {/* Type */}
            <label className="label">Type</label>
            <select
              value={instance.type}
              onChange={(e) =>
                setInstance((p) => ({ ...p, type: e.target.value }))
              }
              className="select"
            >
              <option value="Railpacks">Application</option>
              <option value="Dockerfile">Dockerfile</option>
              <option value="Static">Static</option>
            </select>

            {/* Env */}
            <label className="label">Env Variables</label>
            <textarea
              value={instance.envText}
              onChange={(e) =>
                setInstance((p) => ({ ...p, envText: e.target.value }))
              }
              className="textarea h-24 resize-none"
              placeholder={`NODE=production`}
            />

            {/* Actions */}
            <div className="mx-auto space-x-5 mt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
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

export default CreateInstanceDialog;
