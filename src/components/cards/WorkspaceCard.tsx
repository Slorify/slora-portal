import toast from "react-hot-toast";
import { HiCube } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineOpenInNew } from "react-icons/md";
import { PiPencil } from "react-icons/pi";
import { TbTrash } from "react-icons/tb";
import { FaClockRotateLeft } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteWorkspace } from "../../utils/workspaceApi";

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

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toast.promise(deleteWorkspace(slug), {
      loading: `Deleting workspace ${slug}...`,
      success: (res) => res.message,
      error: (res) => res?.message || "Failed to delete workspace",
    });
    refresh();
  };

  return (
    <Card
      onClick={() => navigate(`${pathname}/${slug}`)}
      className="cursor-pointer p-5 flex flex-col justify-between gap-4 transition hover:bg-muted"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <HiCube size={28} className="text-primary" />
          <h2 className="text-lg font-bold">{name}</h2>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={(e) => e.stopPropagation()}
            className="rounded-md p-2 hover:bg-accent"
          >
            <BsThreeDots size={22} />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                navigate(`${pathname}/${slug}`);
              }}
            >
              <MdOutlineOpenInNew className="mr-2" />
              Open
            </DropdownMenuItem>

            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              <PiPencil className="mr-2" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive focus:text-destructive"
            >
              <TbTrash className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <FaClockRotateLeft />
          {createdAt}
        </span>
        <span className="font-medium">{instances} Instances</span>
      </div>
    </Card>
  );
}

export default WorkspaceCard;
