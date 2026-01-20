import type { ReactNode } from "react";
import type { IconType } from "react-icons";

interface ILayout {
  title: string;
  description: string;
  icon: IconType;
  actions?: ReactNode;
  children: ReactNode;
}

const PageLayout = ({
  title,
  description,
  icon: Icon,
  actions,
  children,
}: ILayout) => {
  return (
    <main className="flex justify-center items-center min-h-90 w-full p-10">
      <div className="bg-base-300 rounded-box p-4 w-full space-y-2 h-full">
        <section className="flex md:flex-row flex-col justify-between bg-base-200 p-10 w-full rounded-md">
          <div>
            <h1 className="flex  text-2xl items-center font-extrabold gap-2 ">
              <Icon size={30} />
              {title}
            </h1>
            <p className="text-base-content/70">{description}</p>
          </div>
          <div>{actions}</div>
        </section>
        <section className="flex items-start justify-center p-3 w-full h-[60vh] bg-base-200 rounded-md overflow-scroll">
          {children}
        </section>
      </div>
    </main>
  );
};

export default PageLayout;
