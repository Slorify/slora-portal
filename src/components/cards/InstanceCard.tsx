import { FaClockRotateLeft } from "react-icons/fa6";
import { SiWebpack } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom";

interface Intance {
  name: string;
  image: string;
  slug: string;
  createdAt: string;
}

const InstanceCard = ({ name, image, slug, createdAt }: Intance) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(pathname + "/" + slug)}
      className="hover:scale-105 active:scale-95 transition-all card w-72 h-30 bg-base-100 shadow-md hover:shadow-lg "
    >
      <div className="card-body p-5 gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="card-title text-base-content text-lg">{name}</h2>
            <p className="text-sm text-base-content/60">{image}</p>
          </div>

          <SiWebpack size={32} />
        </div>

        <div className="text-md text-base-content/60">
          <p className="text-base-content/60 flex items-center gap-2">
            <FaClockRotateLeft /> {createdAt}
          </p>
        </div>
      </div>

      <div className="status status-success animate-ping absolute right-0"></div>
    </div>
  );
};

export default InstanceCard;
