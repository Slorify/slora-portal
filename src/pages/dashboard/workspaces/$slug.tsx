import { useParams } from "react-router-dom";
import { getWorkspace } from "../../../utils/workspaceApi";
import { useEffect, useState } from "react";
import { getAllInstance } from "../../../utils/instanceApi";
import PageLayout from "../../../components/blocks/PageLayout";
import { FaBox } from "react-icons/fa6";
import InstanceCard from "../../../components/cards/InstanceCard";
import CreateInstanceDialog from "../../../components/dialogs/CreateInstanceDialog";
import { timeAgo } from "../../../utils/timeAgo";

interface IWorkspace {
  name: string;
  description: string;
}

interface Iinstance {
  id: number;
  name: string;
  image: string;
  slug: string;
  type: string;
  createdAt: string;
}

const Workspace = () => {
  let { slug } = useParams();
  slug = String(slug);
  const [instances, setInstances] = useState<Iinstance[]>([]);
  const [workspace, setWorkspace] = useState<IWorkspace>({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    const instance = await getAllInstance(slug);
    setInstances(instance);
    const workspace = await getWorkspace(slug);
    setWorkspace(workspace);
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <PageLayout
      icon={FaBox}
      title={workspace.name}
      description={workspace.description}
      actions={
        <CreateInstanceDialog refresh={() => fetchContent()} slug={slug} />
      }
      className="min-h-[60vh]"
    >
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  space-x-2 space-y-2">
        {instances.map((i) => (
          <InstanceCard
            key={i.id}
            slug={i.slug}
            name={i.name}
            image={i.image}
            createdAt={timeAgo(i.createdAt)}
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default Workspace;
