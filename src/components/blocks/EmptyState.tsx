import type { IconType } from "react-icons";

interface IEmpty {
  title: string;
  icon: IconType;
}

const EmptyState = ({ title, icon: Icon }: IEmpty) => {
  return (
    <div className="flex flex-col gap-1 justify-center items-center w-full h-[60vh]">
      <Icon className="text-foreground/80" size={40} />
      <p className="text-muted-foreground text-xl font-sans">{title}</p>
    </div>
  );
};

export default EmptyState;
