import { FaClockRotateLeft } from "react-icons/fa6";
import { SiWebpack } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface Instance {
  name: string;
  image: string;
  slug: string;
  createdAt: string;
}

const InstanceCard = ({ name, image, slug, createdAt }: Instance) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`${pathname}/${slug}`)}
      className="
        relative w-72 cursor-pointer p-5
        transition-transform hover:scale-105 active:scale-95
        hover:shadow-lg
      "
    >
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-muted-foreground">{image}</p>
          </div>
          <SiWebpack size={30} className="text-primary" />
        </div>

        {/* Footer */}
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <FaClockRotateLeft />
          {createdAt}
        </p>
      </div>

      {/* Status ping */}
      <span className="absolute right-0 top-0 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
      </span>
    </Card>
  );
};

export default InstanceCard;
