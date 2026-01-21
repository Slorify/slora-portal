import PageLayout from "@/components/blocks/PageLayout";
import { DeleteIcon } from "@/components/ui/delete";
import { FilePenLineIcon } from "@/components/ui/file-pen-line";
import { getInstance } from "@/utils/instanceApi";
import { BoxIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InstanceContent } from "./InstanceContent";

const InstancePage = () => {
  const { slug, islug } = useParams();
  const [instance, setInstance] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const fetchInstanceData = async () => {
    try {
      const data = await getInstance("testing", "test");
      setInstance(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInstanceData();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <PageLayout
      icon={BoxIcon}
      title={instance.name}
      description={instance.image}
      className="p-0"
      actions={
        <>
          <div className="flex gap-5 text-muted-foreground">
            <FilePenLineIcon className="hover:text-blue-300" size={20} />
            <DeleteIcon className="hover:text-red-400" size={20} />
          </div>
        </>
      }
    >
      <InstanceContent />
    </PageLayout>
  );
};

export default InstancePage;
