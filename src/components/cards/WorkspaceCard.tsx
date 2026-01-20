import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import { HiCube } from "react-icons/hi";
import { MdOutlineOpenInNew } from "react-icons/md";
import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteWorkspace } from "../../utils/workspaceApi";
import { FaClockRotateLeft } from "react-icons/fa6";

type Props = {
  name: string;
  description: string;
  slug: string;
  instances: number;
  createdAt: string;
  refresh: () => void;
};

function WorkspaceCard({
  name,
  description,
  slug,
  instances,
  createdAt,
  refresh,
}: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleDelete = async () => {
    await toast.promise(deleteWorkspace(slug), {
      loading: `Deleting workspace ${slug}..`,
      success: (res) => res.message,
      error: (res) => res.messsage || "Failed to fetch workspace",
    });
    refresh();
  };

  return (
    <div
      onClick={() => navigate(`${pathname}/${slug}`)}
      className="flex flex-col justify-between card bg-base-100 h-35 w-75 p-5"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <HiCube size={30} />
          <h1 className="text-base-content text-xl font-bold">{name}</h1>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className="dropdown dropdown-end p-2"
        >
          <label tabIndex={0} className="cursor-pointer">
            <BsThreeDots size={25} />
          </label>

          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-300 rounded-box z-1 w-42 p-2 shadow-sm font-semibold"
          >
            <li className="text-success">
              <a>
                <MdOutlineOpenInNew size={20} /> Open
              </a>
            </li>
            <li className="text-info">
              <a>
                <PiPencil size={20} /> Edit
              </a>
            </li>
            <li onClick={handleDelete} className="text-error">
              <a>
                <TbTrash size={20} /> Delete
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-base-content/40">{description}</p>

      <div className="flex w-full justify-between">
        <p className="text-base-content/60 flex items-center gap-2">
          <FaClockRotateLeft /> {createdAt}
        </p>
        <p className="">{instances} Instances</p>
      </div>
    </div>
  );
}

export default WorkspaceCard;
