import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";

interface ILayout {
  title: string;
  description: string;
  icon: IconType;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}

const PageLayout = ({
  title,
  description,
  icon: Icon,
  actions,
  titleClassName,
  className,
  children,
}: ILayout) => {
  return (
    <main className="w-full h-full p-6 overflow-auto">
      <div className="w-full space-y-4 rounded-md bg-card p-4 border border-border">
        <section
          className={cn(
            "flex flex-col md:flex-row justify-between gap-4 rounded-md bg-muted p-8",
            titleClassName,
          )}
        >
          <div>
            <h1 className="flex items-center gap-2 text-xl font-extrabold">
              <Icon size={24} className="text-primary" />
              {title}
            </h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {actions && <div>{actions}</div>}
        </section>

        <section
          className={cn(
            "rounded-md bg-muted p-4 py-8 border border-border",
            className,
          )}
        >
          {children}
        </section>
      </div>
    </main>
  );
};
export default PageLayout;
