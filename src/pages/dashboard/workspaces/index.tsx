import { LuFolderPen, LuFolderSync } from "react-icons/lu";
import { PiPlus } from "react-icons/pi";
import WorkspaceCard from "../../../components/cards/WorkspaceCard";
import { useEffect, useRef, useState } from "react";
import { getAllWorkspaces } from "../../../utils/workspaceApi";
import { timeAgo } from "../../../utils/timeAgo";
import CreateWorkspaceDialog from "../../../components/dialogs/CreateWorkspaceDialog";
import PageLayout from "../../../components/blocks/PageLayout";
import EmptyState from "../../../components/blocks/EmptyState";

interface Workspace {
  id: number;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  _count: {
    instances: number;
  };
}

const Workspaces = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  const fetchWorkspaces = async () => {
    const res = await getAllWorkspaces();
    setWorkspaces(res);
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <PageLayout
      title="Workspaces"
      description="Create and manage your workspaces"
      icon={LuFolderPen}
      actions={<CreateWorkspaceDialog refresh={() => fetchWorkspaces()} />}
    >
      {workspaces.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  space-x-2 space-y-2">
          {workspaces.map((ws) => (
            <WorkspaceCard
              key={ws.id}
              name={ws.name}
              description={ws.description}
              slug={ws.slug}
              instances={ws._count.instances}
              createdAt={timeAgo(ws.createdAt)}
              refresh={() => fetchWorkspaces()}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="No workspaces found.." icon={LuFolderSync} />
      )}
    </PageLayout>
  );
};

export default Workspaces;
