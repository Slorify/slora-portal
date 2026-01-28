import { FaClockRotateLeft } from "react-icons/fa6";
import { SiWebpack } from "react-icons/si";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { useInstanceStatus } from "@/hooks/useInstanceStatus";

interface Instance {
  name: string;
  image: string;
  slug: string;
  cslug: string;
  createdAt: string;
}

const InstanceCard = ({ name, image, slug, cslug, createdAt }: Instance) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(`${cslug}-${slug}`);
  const { bgColor } = useInstanceStatus(`${cslug}-${slug}`);
  console.log(bgColor);

  return (
    <Card
      onClick={() => navigate({ to: `${pathname}/${slug}` })}
      className="
        relative w-72 cursor-pointer p-5
        transition-transform hover:scale-105 active:scale-95
        hover:shadow-lg
      "
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-muted-foreground">{image}</p>
          </div>
          <SiWebpack size={30} className="text-primary" />
        </div>

        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <FaClockRotateLeft />
          {createdAt}
        </p>
      </div>

      <span className="absolute right-0 top-0 flex h-3 w-3">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${bgColor}`}
        />
        <span
          className={`relative inline-flex h-3 w-3 rounded-full ${bgColor}`}
        />
      </span>
    </Card>
  );
};

export default InstanceCard;
